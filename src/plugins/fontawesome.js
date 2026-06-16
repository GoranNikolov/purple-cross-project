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
  faEye,
  faPen,
  faTrash,
  faUsers,
  faUserCheck,
  faBuilding,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBars,
  faSun,
  faMoon,
  faTriangleExclamation,
  faArrowUpWideShort,
  faArrowDownShortWide,
  faGripVertical,
  faEye,
  faPen,
  faTrash,
  faUsers,
  faUserCheck,
  faBuilding,
  faClock,
);

export { FontAwesomeIcon };
