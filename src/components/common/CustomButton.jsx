import { Link } from "react-router-dom";

export const CustomButton = ({
  btnText,
  btnClickHandler,
  btnClassNames,
  btnIcon,
  path,
  isLink,
  btnDisabled,
}) =>
  isLink ? (
    <div className="flex-shrink-0">
      <div className="d-flex gap-2 flex-wrap">
        <Link to={`/${path}`} className={btnClassNames}>
          {btnIcon}

          {btnText}
        </Link>
      </div>
    </div>
  ) : (
    <button
      type="button"
      className={btnClassNames}
      onClick={btnClickHandler}
      disabled={btnDisabled}
    >
      {btnIcon && btnIcon}
      {btnText}
    </button>
  );
