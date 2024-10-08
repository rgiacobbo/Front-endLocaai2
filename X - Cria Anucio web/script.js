let currentImageIndex = 0;
let images = [];


document.getElementById('image-upload').addEventListener('change', function(event) {
    const files = Array.from(event.target.files);
    const previewContainer = document.querySelector('.image-preview-container');
    images = [];
  
    previewContainer.innerHTML = ''; 

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            previewContainer.appendChild(imgElement);
            images.push(imgElement);
        }
        reader.readAsDataURL(file);
    });

    if (images.length > 0) {
        currentImageIndex = 0;
        showImage(currentImageIndex);
        document.getElementById('prevImage').style.display = 'block';
        document.getElementById('nextImage').style.display = 'block';
    }
});


function showImage(index) {
    images.forEach((img, i) => {
        img.style.display = (i === index) ? 'block' : 'none'; // Exibe apenas a imagem atual
    });
}

    
    



    document.getElementById('prevImage').addEventListener('click', function() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            showImage(currentImageIndex);
        }
    });

    document.getElementById('nextImage').addEventListener('click', function() {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            showImage(currentImageIndex);
        }
    });

function calcularDiferencaDias(dataInicio, dataFim) {
    const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
    const diferencaEmMilissegundos = new Date(dataFim) - new Date(dataInicio);
    return Math.ceil(diferencaEmMilissegundos / umDiaEmMilissegundos); 
}


function calcularValor() {
    const dataInicio = document.getElementById('data-inicio').value;
    const dataFim = document.getElementById('data-final').value;

    if (dataInicio && dataFim) {
        const diferencaDias = calcularDiferencaDias(dataInicio, dataFim);

        if (diferencaDias >= 0) {
       
            const valorBase = 300;
            const valorTotal = Math.ceil(diferencaDias / 7) * valorBase;

          
            document.getElementById('valor-total').textContent = valorTotal.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        } else {
            alert("A data final deve ser posterior à data de início.");
        }
    }
}

document.getElementById('data-inicio').addEventListener('change', calcularValor);
document.getElementById('data-final').addEventListener('change', calcularValor);