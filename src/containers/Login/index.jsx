import React from 'react'
import { Card } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { changeFormFields, sendLoginRequest } from '../../actions/login'
import Form from './Form'
import AppFooter from '../../components/AppFooter'
import logoImage from '../../assets/react.svg'
import backgroundImage from '../../assets/background.jpg'
import './index.less'

class Login extends React.Component {
  render() {
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/admin' }} />
    }
    return (
      <div
        className='login-page'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Card className='login-form'>
          <div className='header'>
            <img src={logoImage} height='48px' alt='React Starter' />
            <h1>Admin Portal</h1>
            <p>Admin Portal for React Starter</p>
          </div>
          <Form
            onSubmit={this.props.handleFormOnSubmit}
            onFieldsChange={this.props.handleFormOnFieldsChange}
            formFieldValues={this.props.formFieldValues}
            isLoading={this.props.isLoading}
          />
        </Card>
        <AppFooter />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    formFieldValues,
    isLoading,
  } = state.login
  const isLoggedIn = !!state.app.accessToken
  return {
    formFieldValues,
    isLoading,
    isLoggedIn,
  }
}

const mapDispatchToProps = dispatch => ({
  handleFormOnSubmit: formValues => dispatch(sendLoginRequest(formValues)),
  handleFormOnFieldsChange: formFieldsChange => dispatch(changeFormFields(formFieldsChange)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
