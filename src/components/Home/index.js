import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordList from '../PasswordList'

class Home extends Component {
  state = {
    passwords: [],
    showPassword: false,
    inputUrl: '',
    inputUser: '',
    inputPassword: '',
    searchInput: '',
  }

  onDeletePassword = id => {
    const {passwords} = this.state

    const newfilteredList = passwords.filter(each => each.id !== id)
    this.setState({passwords: newfilteredList})
  }

  onChangeWebsite = event => {
    this.setState({inputUrl: event.target.value})
  }

  onChangeUser = event => {
    this.setState({inputUser: event.target.value})
  }

  onChangePassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  onClickAdd = () => {
    const {inputUrl, inputPassword, inputUser} = this.state
    if (inputUrl !== '' && inputPassword !== '' && inputUser !== '') {
      const newPasswordRecord = {
        id: uuidv4(),
        inputUrl,
        inputUser,
        inputPassword,
      }
      this.setState(prevState => ({
        passwords: [...prevState.passwords, newPasswordRecord],
        inputUrl: '',
        inputUser: '',
        inputPassword: '',
      }))
    }
  }

  onSearchChange = e => {
    this.setState({searchInput: e.target.value})
  }

  filteredList = () => {
    const {passwords, searchInput} = this.state
    return passwords.filter(each =>
      each.inputUrl.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  onCheckClick = () =>
    this.setState(prevState => ({showPassword: !prevState.showPassword}))

  render() {
    const {
      searchInput,
      showPassword,
      inputUrl,
      inputUser,
      inputPassword,
    } = this.state

    const searchResults = this.filteredList()

    return (
      <div className="password-manager-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />

        <div className="password-input-card-container">
          <div className="password-input-card">
            <h className="manager-heading">Add new Password</h>
            <div className="enter-value-card">
              <div className="icon-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon"
                />
              </div>
              <div className="icon-value-card">
                <input
                  type="text"
                  className="icon-value"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={inputUrl}
                />
              </div>
            </div>
            <div className="enter-value-card">
              <div className="icon-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon"
                />
              </div>
              <div className="icon-value-card">
                <input
                  type="textarea"
                  className="icon-value"
                  placeholder="Enter Username"
                  onChange={this.onChangeUser}
                  value={inputUser}
                />
              </div>
            </div>
            <div className="enter-value-card">
              <div className="icon-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon"
                />
              </div>
              <div className="icon-value-card">
                <input
                  type="password"
                  className="icon-value"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={inputPassword}
                />
              </div>
            </div>
            <button
              type="button"
              className="add-button"
              onClick={this.onClickAdd}
            >
              Add
            </button>
          </div>
          <div className="password-manager-img-card">
            <picture>
              <source
                srcSet="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                media="(max-width:767px)"
                className="password-manager-img"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-img"
              />
            </picture>
          </div>
        </div>
        <div className="store-password-section">
          <div className="your-password-header-section">
            <div className="pass-header-section">
              <h1 className="header"> Your Passwords</h1>
              <p className="password-count">{searchResults.length}</p>
            </div>
            <div className="search-section">
              <div className="search-icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search"
                />
              </div>
              <div className="search-input-container">
                <input
                  type="text"
                  className="text-search"
                  placeholder="Search"
                  onChange={this.onSearchChange}
                  value={searchInput}
                />
              </div>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="password-check-section">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              onChange={this.onCheckClick}
            />
            <p className="checkbox-header">Show Passwords</p>
          </div>
          <div className="password-list">
            {searchResults.length !== 0 ? (
              <ul className="password-stored-cards">
                {searchResults.map(each => (
                  <PasswordList
                    details={each}
                    key={each.id}
                    showPassword={showPassword}
                    onDeletePassword={this.onDeletePassword}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-passwords">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-img"
                />
                <h1 className="no-password-header">No Passwords</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
