import React from 'react';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        };
    }



    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        if(this.state.signInEmail.length < 1 || this.state.signInPassword.length < 1) {
            window.alert('Algum dado faltando! Tente novamente!')
            return;
        } else if (!this.state.signInEmail.includes('@')) {
            window.alert('Email não está no formato correto!')
            return;
        } else {
            window.alert('Por favor aguarde alguns segundos. Ao realizar a comunicação com o backend, Heroku free '+
            'leva algun tempo para subir o container contendo o servidor. Você será logado ao completar.');
        }
        fetch('https://guarded-wave-28569.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => {
            if(response.status != 200) {
                window.alert('Dados incorreto ou usuário já cadastrado!');
            } else {
                return response.json();;
            }
        })
        .then(user => {
            if(user === undefined) {
                return;
            }
            if(user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        });
    }


    render() {

        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email" name="email-address"
                                id="email-address"
                                onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={()=> this.props.onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );

    }

}

export default Signin;
