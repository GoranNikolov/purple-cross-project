import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Icons (import only what you use)
import {
  faBars,
  faSun,
  faMoon,
  faTriangleExclamation,
  faGripVertical,
  faArrowUpWideShort,
  faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBars,
  faSun,
  faMoon,
  faTriangleExclamation,
  faArrowUpWideShort,
  faArrowDownShortWide,
  faGripVertical,
);

export { FontAwesomeIcon };
