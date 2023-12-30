import PropTypes from "prop-types"

export default function FloatingInput({
  id,
	placeholder,
	type,
	labelText,
	onChange,
	value,
	name,
	required
}) {
  return (
    <div className="form-floating">
      {type === "textarea" ? (
				<textarea
					id={id}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					name={name}
					required={required ? true : false}
          className="form-control"
				></textarea>
			) : (
				<input
					type={type}
					id={id}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					name={name}
					required={required ? true : false}
          className="form-control"
				/>
			)}
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
    </div>
  )
}

FloatingInput.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
}