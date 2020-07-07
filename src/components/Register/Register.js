import React from 'react';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        };
    }

    onSubmitRegister = () => {
        if(this.state.password.length < 1 || this.state.name.length < 1 || this.state.email.length < 1 ) {
            window.alert('Algum dado faltando! Tente novamente!')
            return;
        } else if (!this.state.email.includes('@')) {
            window.alert('Email não está no formato correto!')
            return;
        } else {
            window.alert('Por favor aguarde alguns segundos. Ao realizar a comunicação com o backend, Heroku gratis '+
            'leva algun tempo para subir o container contendo o servidor. Você será logado ao completar.');
        }

        fetch('https://guarded-wave-28569.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
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

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    render() {

        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"
                                name="name"
                                id="name"
                                onChange = {this.onNameChange} />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email"
                                name="email-address"
                                id="email-address"
                                onChange = {this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange = {this.onPasswordChange} />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>

        );
    }
}

export default Register;
