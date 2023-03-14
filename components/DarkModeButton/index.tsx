import { useThemeStore } from "@states/app";
import { cx } from "@utils/tools";

import styles from "./styles.module.scss";

const DarkModeButton: IComponent<{ className?: string }> = ({ className }) => {
  const { darkMode, setDarkMode } = useThemeStore();

  return (
    <div
      className={cx(
        styles.toggleThemeWrapper,
        "active:scale-75 ease-in-out duration-500 p-2 cursor-pointer z-30",
        className
      )}
    >
      <label className={styles.toggleTheme} htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onClick={() => setDarkMode(darkMode === "dark" ? "light" : "dark")}
        />
        <div
          className={`${
            darkMode === "dark" ? cx(styles.dark, "!bg-[#8796A5]") : ""
          } ${styles.slider} `}
        ></div>
      </label>
    </div>
  );
};

export default DarkModeButton;
