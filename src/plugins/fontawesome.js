import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Icons (import only what you use)
import {
  faBars,
  faSun,
  faMoon,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBars, faSun, faMoon, faTriangleExclamation);

export { FontAwesomeIcon };
