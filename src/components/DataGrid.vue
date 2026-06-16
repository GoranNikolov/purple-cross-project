<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed, watch } from "vue";
import type { GridConfig, GridColumn } from "@/types/grid";
import BaseButton from "@/components/ui/button/BaseButton.vue";
import { useInfiniteScroll } from "@/composables/useInfiniteScroll";

const props = defineProps<{
  rows: T[];
  config: GridConfig<T>;
}>();

const sortKey = ref<string | null>(null);
const sortAsc = ref(true);
const filters = ref<Record<string, string>>({});
const groupByKey = ref<string | null>(null);
const dragOverGroupZone = ref(false);
const collapsedGroups = ref<Set<string>>(new Set());
const scrollContainer = ref<HTMLElement | null>(null);
const infiniteSentinel = ref<HTMLElement | null>(null);
const currentPage = ref(1);
const visibleCount = ref(props.config.pagination?.pageSize ?? Infinity);

const paginationMode = computed(() => props.config.pagination?.mode ?? "none");
const pageSize = computed(() => props.config.pagination?.pageSize ?? Infinity);

const filteredRows = computed(() => {
  const active = Object.entries(filters.value).filter(
    ([, v]) => v.trim() !== "",
  );
  if (active.length === 0) return props.rows;
  return props.rows.filter((row) =>
    active.every(([key, value]) =>
      String(row[key] ?? "")
        .toLowerCase()
        .includes(value.toLowerCase()),
    ),
  );
});
const sortedRows = computed(() => {
  if (!sortKey.value) return filteredRows.value;
  const key = sortKey.value;
  const dir = sortAsc.value ? 1 : -1;
  return [...filteredRows.value].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av == null && bv == null) return 0;
    if (av == null) return -1 * dir;
    if (bv == null) return 1 * dir;
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });
});
const totalRows = computed(() => sortedRows.value.length);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalRows.value / pageSize.value)),
);

const pagedRows = computed(() => {
  if (paginationMode.value === "none") return sortedRows.value;
  if (paginationMode.value === "paged") {
    const start = (currentPage.value - 1) * pageSize.value;
    return sortedRows.value.slice(start, start + pageSize.value);
  }
  return sortedRows.value.slice(0, visibleCount.value);
});

const groupedRows = computed(() => {
  if (!groupByKey.value) return null;
  const key = groupByKey.value;
  const groups = new Map<string, T[]>();
  for (const row of pagedRows.value) {
    const groupVal = String(row[key] ?? "Unspecified");
    if (!groups.has(groupVal)) groups.set(groupVal, []);
    groups.get(groupVal)!.push(row);
  }
  return groups;
});

watch(
  [filters, sortKey, sortAsc, groupByKey],
  () => {
    currentPage.value = 1;
    visibleCount.value = pageSize.value;
  },
  { deep: true },
);

useInfiniteScroll(
  infiniteSentinel,
  () => {
    if (paginationMode.value !== "infinite") return;
    if (visibleCount.value >= totalRows.value) return;
    visibleCount.value = Math.min(
      visibleCount.value + pageSize.value,
      totalRows.value,
    );
  },
  scrollContainer,
);

// Table actions
function toggleSort(key: string) {
  const column = props.config.columns.find((c) => c.key === key);
  if (!column?.sortable) return;
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
}

function setFilter(key: string, value: string) {
  filters.value = { ...filters.value, [key]: value };
}

// Grouping actions
function onColumnDragStart(e: DragEvent, col: GridColumn<T>) {
  if (!col.groupable) return;
  e.dataTransfer?.setData("text/plain", String(col.key));
}

function onGroupZoneDrop(e: DragEvent) {
  const key = e.dataTransfer?.getData("text/plain");
  if (key) groupByKey.value = key;
  dragOverGroupZone.value = false;
}

function clearGrouping() {
  groupByKey.value = null;
}

function toggleGroup(groupVal: string) {
  if (collapsedGroups.value.has(groupVal))
    collapsedGroups.value.delete(groupVal);
  else collapsedGroups.value.add(groupVal);
  collapsedGroups.value = new Set(collapsedGroups.value);
}

//Pagination actions
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

// Helpers
function rowKeyValue(row: T): string {
  return String(row[props.config.rowKey as string]);
}

function cellValue(row: T, key: string): string {
  const column = props.config.columns.find((c) => c.key === key);
  if (column?.formatter) return column.formatter(row);
  const val = row[key];
  return val == null ? "" : String(val);
}
</script>

<template>
  <div
    class="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
  >
    <!-- Group-by drop zone -->
    <div
      v-if="config.enableGrouping"
      class="flex items-center gap-2 p-2.5 border-b border-slate-200 dark:border-slate-700 text-sm transition-colors"
      :class="
        dragOverGroupZone
          ? 'bg-primary-50 dark:bg-primary-900/20'
          : 'bg-slate-50 dark:bg-slate-800'
      "
      @dragover.prevent="dragOverGroupZone = true"
      @dragleave="dragOverGroupZone = false"
      @drop.prevent="onGroupZoneDrop"
    >
      <span class="text-slate-500 dark:text-slate-400">Group by:</span>

      <!-- Dropdown — works for all users, no drag required -->
      <select
        class="px-2 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        :value="groupByKey ?? ''"
        @change="
          groupByKey = ($event.target as HTMLSelectElement).value || null
        "
      >
        <option value="">None</option>
        <option
          v-for="col in config.columns.filter((c) => c.groupable)"
          :key="String(col.key)"
          :value="String(col.key)"
        >
          {{ col.label }}
        </option>
      </select>

      <!-- Active group badge (cleared from either dropdown or ✕ button) -->
      <span
        v-if="groupByKey"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-medium"
      >
        {{ config.columns.find((c) => c.key === groupByKey)?.label }}
        <button class="hover:text-danger-600" @click="clearGrouping">✕</button>
      </span>
      <span v-else class="text-slate-400 italic"
        >or drag a column header here</span
      >
    </div>

    <div
      ref="scrollContainer"
      class="overflow-y-auto overflow-x-auto max-h-[600px]"
    >
      <table class="w-full text-sm">
        <thead>
          <tr
            class="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700"
          >
            <th
              v-for="col in config.columns"
              :key="String(col.key)"
              :draggable="config.enableGrouping && col.groupable"
              class="p-3 text-left font-semibold text-slate-600 dark:text-slate-300 select-none"
              :class="[
                col.sortable
                  ? 'cursor-pointer hover:text-primary-600 dark:hover:text-primary-400'
                  : '',
                config.enableGrouping && col.groupable ? 'cursor-grab' : '',
              ]"
              @click="col.sortable && toggleSort(String(col.key))"
              @dragstart="onColumnDragStart($event, col)"
            >
              <span class="inline-flex items-center gap-1">
                <FontAwesomeIcon
                  v-if="config.enableGrouping && col.groupable"
                  icon="fa-solid fa-grip-vertical"
                  class="text-slate-400 text-xs"
                />

                {{ col.label }}

                <FontAwesomeIcon
                  v-if="sortKey === col.key && sortAsc"
                  icon="fa-solid fa-arrow-up-wide-short"
                  class="text-xs"
                />

                <FontAwesomeIcon
                  v-if="sortKey === col.key && !sortAsc"
                  icon="fa-solid fa-arrow-down-short-wide"
                  class="text-xs"
                />
              </span>
            </th>
          </tr>
          <!-- Filter row under headers -->
          <tr
            class="bg-white dark:bg-surface-dark-alt border-b border-slate-200 dark:border-slate-700"
          >
            <th
              v-for="col in config.columns"
              :key="`filter-${String(col.key)}`"
              class="p-2"
            >
              <input
                v-if="col.filterable"
                type="text"
                :placeholder="`Search...`"
                class="w-full px-2 py-1 text-sm rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                @input="
                  setFilter(
                    String(col.key),
                    ($event.target as HTMLInputElement).value,
                  )
                "
              />
            </th>
          </tr>
        </thead>

        <!-- Grouped rendering -->
        <tbody v-if="groupedRows">
          <template
            v-for="[groupVal, groupRows] in groupedRows"
            :key="groupVal"
          >
            <tr
              class="bg-slate-100 dark:bg-slate-700/50 cursor-pointer"
              @click="toggleGroup(groupVal)"
            >
              <td
                :colspan="config.columns.length"
                class="p-2.5 font-semibold text-slate-700 dark:text-slate-200"
              >
                <span class="inline-flex items-center gap-2">
                  <span>{{ collapsedGroups.has(groupVal) ? "▶" : "▼" }}</span>
                  {{ groupVal }}
                  <span class="text-xs font-normal text-slate-400"
                    >({{ groupRows.length }})</span
                  >
                </span>
              </td>
            </tr>
            <tr
              v-for="row in collapsedGroups.has(groupVal) ? [] : groupRows"
              :key="rowKeyValue(row)"
              class="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <td
                v-for="col in config.columns"
                :key="String(col.key)"
                class="p-3"
              >
                <slot
                  v-if="col.component"
                  :name="`cell-${String(col.key)}`"
                  :row="row"
                />
                <span v-else>{{ cellValue(row, String(col.key)) }}</span>
              </td>
            </tr>
          </template>
        </tbody>

        <!-- Flat rendering (no grouping) -->
        <tbody v-else>
          <tr
            v-for="row in pagedRows"
            :key="rowKeyValue(row)"
            class="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <td
              v-for="col in config.columns"
              :key="String(col.key)"
              class="p-3"
            >
              <slot
                v-if="col.component"
                :name="`cell-${String(col.key)}`"
                :row="row"
              />
              <span v-else>{{ cellValue(row, String(col.key)) }}</span>
            </td>
          </tr>
          <tr v-if="pagedRows.length === 0">
            <td
              :colspan="config.columns.length"
              class="p-6 text-center text-slate-400"
            >
              No rows match your filters.
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="paginationMode === 'infinite'"
        class="p-3 text-center text-sm text-slate-400"
      >
        Showing {{ pagedRows.length }} of {{ totalRows }}
        <span v-if="pagedRows.length < totalRows">
          · loading more on scroll...</span
        >
      </div>
      <div
        v-if="paginationMode === 'infinite'"
        ref="infiniteSentinel"
        class="h-1"
      ></div>
    </div>

    <!--Footer-->
    <div
      v-if="paginationMode === 'paged' && totalRows > 0"
      class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400"
    >
      <span
        >Page {{ currentPage }} of {{ totalPages }} ({{ totalRows }} rows)</span
      >
      <div class="flex gap-2">
        <BaseButton
          variant="outline"
          size="sm"
          :disabled="currentPage === 1"
          @click="prevPage"
          >Previous</BaseButton
        >
        <BaseButton
          variant="outline"
          size="sm"
          :disabled="currentPage === totalPages"
          @click="nextPage"
          >Next</BaseButton
        >
      </div>
    </div>
  </div>
</template>
