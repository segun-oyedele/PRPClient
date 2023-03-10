import PropTypes from "prop-types"
import { useState } from "react"
import { showAllPartners, sortByName, useAppDispatch } from "../../store"
const trStylesDefault =
  "text-sm leading-normal rounded-tr raleway-m rounded-tl md:h-12"
const trColorsDefault = "text-gray-600"

export const TableHead = ({
  theadItems,
  theadTrStyles,
  theadTrColors,
  theadTrGridStyles,
}) => {
  const [sorted, setSorted] = useState(true)

  const dispatch = useAppDispatch()

  return (
    <thead>
      <tr
        className={`${theadTrStyles || trStylesDefault} ${
          theadTrColors || trColorsDefault
        } ${theadTrGridStyles || ""}`}
      >
        {theadItems.map(({ label, stylesClasses }, index) => (
          <th
            key={label}
            className={`select-none ${stylesClasses} thead-item text-sm`}
          >
            {index === 0 && <span className='mr-5'>#</span>}
            {label}
            {label === "Name" && (
              <span
                onClick={() => {
                  sorted
                    ? dispatch(sortByName())
                    : dispatch(showAllPartners())
                  setSorted(!sorted)
                }}
              >
                {sorted ? " 🔽" : " 🔼"}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHead.propTypes = {
  theadItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      stylesClasses: PropTypes.string.isRequired,
    })
  ).isRequired,
  theadTrStyles: PropTypes.string,
  theadTrColors: PropTypes.string,
  theadTrGridStyles: PropTypes.string,
}
