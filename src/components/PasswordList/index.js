import './index.css'

const PasswordList = props => {
  const {details, showPassword, onDeletePassword} = props
  const {id, inputUrl, inputUser, inputPassword} = details

  const deletePass = () => {
    onDeletePassword(id)
  }

  const showPattern = showPassword ? (
    <p className="ps-card-val">{inputPassword}</p>
  ) : (
    <img
      className="ps-show-img"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  return (
    <li className="ps-card">
      <div className="profile-pic">{inputUrl.charAt(0).toUpperCase()}</div>
      <div className="ps-card-val-card">
        <p className="ps-card-val">{inputUrl}</p>
        <p className="ps-card-val">{inputUser}</p>
        {showPattern}
      </div>

      <button type="button" className="button-del" onClick={deletePass}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-logo"
        />
      </button>
    </li>
  )
}
export default PasswordList
