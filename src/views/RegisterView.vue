<template>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
    </head>

    <body>
        <div class="main">
            <div class="box">

                <div class="left-box">
                    <div class="icon">
                        <i class="bi bi-yin-yang"></i>
                    </div>

                    <div class="text">
                        <h4>A fortuna fica ao lado daquele que ousa.</h4>
                        <p>Todo progresso ocorre fora da zona de conforto.</p>
                    </div>

                    <div class="logo">
                        <div class="gradient"></div>
                        <div class="gradient2">
                            <div class="fundo-shape"></div>
                            <div class="posicao-shape">
                                <div class="lower-shape"></div>
                                <div class="upper-shape"></div>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="login">
                    <div>
                        <h3 class="fw-bold">Inscreva-se</h3>
                    </div>

                    <div class="form m-2">
                        <label for="nome">Nome completo</label>
                        <input class="form-control" type="nome" name="nome" id="nome" placeholder="Nome e sobrenome">
                        <label for="email">Endereço de e-mail</label>
                        <input class="form-control" type="email" name="email" id="email" placeholder="email@email.com.br">
                        <label for="senha">Senha de acesso</label>
                        <input class="form-control" type="password" name="senha" id="senha" placeholder="********">
                    </div>


                    <div class="links">
                        <router-link to="/">Já tenho conta</router-link>
                        <router-view></router-view>
                        <router-link to="/"><button class="confirm">Registrar</button></router-link>
                    </div>
                </div>
            </div>
        </div>






    </body>
</template>

<style scoped>
body {
    background-color: black !important;
    position: static;
    margin: 0;
    top: 0;
}

* {
    font-family: 'Montserrat', sans-serif;
    padding: 0px;
    margin: 0px;
}

.main {
    display: flex;
    
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.box {
    display: flex;
    flex-direction: row-reverse;
    background-color: white;
    top: 50px;
    right: 50px;
    width: 1280px;
    height: 657px;
    gap: 40px;
}

.left-box {
    display: grid;
    width: 609px;
    height: 599px;
    margin: 31px;
    transition: .4s;
    color: white;
    background-color: black;
}

.left-box:hover {
    color: black;
    background-color: white;
    transition: .4s;
}

.left-box:hover .icon {
    margin: 120px 0 0 80px;
    color: black;
}

.icon {
    position: absolute;
    margin: 80px 0 0 80px;
    font-size: 3rem;
    color: white;
}

.text {
    margin-top: 300px;
    margin-left: 45px;
    transition: .1s !important;
}

.text h4 {
    font-weight: 900;
}

.login {
    margin-left: 20px;
    margin-top: 40px;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    justify-content: space-evenly;
}

.login h2 {
    font-size: 40px;
    font-weight: 900;
}

.form {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 20px;
}

.form input {
    height: 3rem;
    border: none;
    color: gray;
}

.links {
    margin: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

a {
    color: gray !important;
    text-decoration: none !important;
}

.confirm {
    background: black;
    color: white;
    padding: 30px 80px 30px 80px;
    line-height: 28.80px;
    font-size: 18px;
}

.logo {
    width: 100%;
    height: 100%;
    position: relative;
    margin-bottom: 48px;
    margin-left: 48px
}

.gradient {
    width: 100px;
    height: 100px;
    left: 0px;
    top: 0px;
    position: absolute;
    background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.20) 36%, rgba(255, 255, 255, 0) 100%)
}

.left-box:hover .gradient {
    width: 100px;
    height: 100px;
    left: 0px;
    top: 0px;
    position: absolute;
    background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.20) 36%, rgba(0, 0, 0, 0) 100%);
}

.gradient2 {
    width: 100px;
    height: 100px;
    left: 135px;
    top: 0px;
    position: absolute
}

.fundo-shape {
    width: 100px;
    height: 100px;
    left: 0px;
    top: 0px;
    position: absolute;
    background: white;
    box-shadow: 10px 10px 20px rgba(37.27, 38.43, 48.87, 0.10)
}

.posicao-shape {
    width: 61.51px;
    height: 49.72px;
    left: 19.24px;
    top: 25.14px;
    position: absolute
}

.lower-shape {
    width: 40.52px;
    height: 40.52px;
    left: 30.76px;
    top: 10.21px;
    position: absolute;
    transform: rotate(45deg);
    transform-origin: 0 0;
    background: rgba(0, 0, 0, 0.30)
}

.upper-shape {
    width: 40.52px;
    height: 40.52px;
    left: 30.76px;
    top: -3px;
    position: absolute;
    transform: rotate(45deg);
    transform-origin: 0 0;
    background: black
}



.left-box:hover .fundo-shape {
    background-color: black;
}

.left-box:hover .upper-shape {
    background: white;
}

.left-box:hover .lower-shape {
    background: rgba(255, 255, 255, 0.30)
}

.left-box * {
    transition: .5s;
}

.confirm {
    cursor: pointer;
    background: black;
    color: white;
    padding: 30px 80px 30px 80px;
    line-height: 28.80px;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-control {
      transition: none;
    }
}

@media only screen and (max-width: 768px) {
    * {
      display: block;
      justify-content: space-evenly;
    }
    .left-box {
        display: none;
    }
    .links {
        margin: 0px;
    }
    .links button, .links a {
        padding: 10px;
        width: 100%;
    }
  }
</style>