document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const usuario = prompt("Digite seu usuário:");
        const senha = prompt("Digite sua senha:");

        if (usuario && senha) {
            const credenciais = btoa(usuario + ":" + senha);
            sessionStorage.setItem("adminAuth", credenciais);
            alert("Login de administrador realizado com sucesso!");
            window.location.href = "admin.html";
        }
        else {
            alert("Preencha usuário e senha para continuar.");
        }
    });
    }
});