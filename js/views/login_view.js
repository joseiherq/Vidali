var loginView = Backbone.View.extend({
    model: new loginModel(),
    el: $("#container"),
	events:{
        "click .forgot": "recoverPassword", //no avanza de aqui
        "click .remember" : "setRemember",
        "click .login": "doLogin"
    },
    doLogin: function(){
        $("#background").fadeIn(500);
        event.preventDefault();
    	console.log("login");

        this.model.set({Email: $('#email').val()});
        this.model.set({Password: $('#password').val()});
        if($('#remember').prop('checked'))
            this.model.set({Remember: true});
        var remember = this.model.get("Remember");
        this.model.fetch({
            data: {
                email: this.model.get("Email"),
                password: this.model.get("Password")
            },
            type: 'POST',
            success: (function(model){
                model.set({LoginAcepted : true});
                console.log("VDL: "+ model.attributes.session_auth);
                sessionStorage.setItem('session_auth',model.attributes.session_auth);
                if(remember == true)
                    localStorage.setItem('session_auth',model.attributes.session_auth);
            }),
            error: (function(model){
                model.set({LoginFailed : true});//aki
                model.errorMsg('Wrong user or password, please try again.',"warning");
                $('#background').fadeOut(500);
            })
        });
    },
    recoverPassword: function(){
    	console.log("recover");
    },
    render: function(){
        $('#container').empty();
        $.when($('#container').load('login.html'))
               .done(function() {
                $('#background').fadeOut(500);
        });
    },
    initialize: function(){
    }
});