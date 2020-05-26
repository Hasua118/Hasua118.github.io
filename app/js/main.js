window.onload = init

function init() {
    view.showScreen('loading')
    firebase.auth().onAuthStateChanged(function (user) {
        if (user && user.emailVerified) {
            model.currentUser = user
        }
        if (model.checkSignUp == 1) {
            view.showScreen('signUp')
        } else {
            view.showScreen('home')
        }
    })
}