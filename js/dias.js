// JS (dias.js)
function openPopup() {
    document.getElementById("popupForm").style.display = "block";
}

function closePopup() {
    document.getElementById("popupForm").style.display = "none";
}

document.getElementById("exerciseForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const diasDaSemana = {
        segunda: 'Segunda-feira',
        terca: 'Terca-feira',
        quarta: 'Quarta-feira',
        quinta: 'Quinta-feira',
        sexta: 'Sexta-feira'

    };


    const nome = document.getElementById("nome").value;
    const musculo = document.getElementById("musculo").value;
    const peso = document.getElementById("peso").value;
    const repeticao = document.getElementById("repeticao").value;
    const diaSelecionado = document.getElementById("diaSemana").value;
    const diaPorExtenso = diasDaSemana[diaSelecionado];
    console.log(diaPorExtenso); // Exibirá "Quarta-feira" no console


    const data = {
        nome,
        musculo,
        peso,
        repeticao,
        diaPorExtenso
    };

    fetch('/addExercise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Recarregar a página ou atualizar a tabela com o novo exercício
                location.reload();
            } else {
                alert("Erro ao adicionar exercício");
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao adicionar exercício");
        });
});

function removeExercise(button, exerciseId) {
    fetch(`/removeExercise/${exerciseId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Remover a linha da tabela
                const row = button.parentElement.parentElement;
                row.parentElement.removeChild(row);
            } else {
                alert("Erro ao remover exercício");
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao remover exercício");
        });
}
