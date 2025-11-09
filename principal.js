const uploadFile = document.getElementById('uploadFile');
const cameraFile = document.getElementById('cameraFile');
const preview = document.getElementById('preview');
const form = document.getElementById('reportForm');
const problemType = document.getElementById('problemType');


const btnGeolocalizacao = document.getElementById('btnGeolocalizacao');
const localizacaoInput = document.getElementById('localizacao');


let latitudeParaEnviar = null;
let longitudeParaEnviar = null;


function previewImage(fileInput) {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    }
    reader.readAsDataURL(file);
  }
}
uploadFile.addEventListener('change', () => previewImage(uploadFile));
cameraFile.addEventListener('change', () => previewImage(cameraFile));


btnGeolocalizacao.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        btnGeolocalizacao.innerText = "Carregando...";
        btnGeolocalizacao.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitudeParaEnviar = position.coords.latitude;
                longitudeParaEnviar = position.coords.longitude;
                
                localizacaoInput.value = "Localização GPS capturada com sucesso!";
                btnGeolocalizacao.innerText = "Localização Capturada!";
                btnGeolocalizacao.disabled = false;
            },
            (error) => {
                console.error("Erro na geolocalização:", error.message);
                alert("Não foi possível obter sua localização. Por favor, digite o endereço manualmente.");
                btnGeolocalizacao.innerText = "Usar minha localização atual";
                btnGeolocalizacao.disabled = false;
            }
        );
    } else {
        alert("Seu navegador não suporta geolocalização. Por favor, digite o endereço manualmente.");
    }
});


form.addEventListener('submit', e => {
    e.preventDefault();
    const problemSelect = document.getElementById('problemType');
    const description = document.getElementById('description').value;
    const localizacao = document.getElementById('localizacao').value;
    const categoriaId = problemSelect.value;
    let titulo = problemSelect.options[problemSelect.selectedIndex].text; 
    const dadosRelato = {
      titulo: titulo,
      descricao: description,
      localizacao: localizacao,
      latitude: latitudeParaEnviar, 
      longitude: longitudeParaEnviar, 
      categoria: {
        id: parseInt(categoriaId) 
      }
    };

    console.log("Enviando para o back-end:", dadosRelato);
    const submitButton = form.querySelector('.submit');
    submitButton.innerText = "Enviando...";
    submitButton.disabled = true;
    
    fetch('http://localhost:8081/api/relatos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosRelato) 
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.message || 'Erro do servidor');
        });
      }
      return response.json();
    })
    .then(relatoCriado => {
      
      console.log('Relato criado com sucesso!', relatoCriado);
      alert('Seu relato foi enviado com sucesso! Protocolo: ' + relatoCriado.id);
      
      form.reset();
      preview.innerHTML = "";
      localizacaoInput.value = "";
      latitudeParaEnviar = null;
      longitudeParaEnviar = null;
      btnGeolocalizacao.innerText = "Usar minha localização atual";
      submitButton.innerText = "Enviar Problema";
      submitButton.disabled = false;
    })
    .catch(error => {
      console.error('Erro ao criar relato:', error);
      alert('Houve um erro ao enviar seu relato: ' + error.message);
      submitButton.innerText = "Enviar Problema";
      submitButton.disabled = false;
    });
});