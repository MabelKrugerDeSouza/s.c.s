document.addEventListener('DOMContentLoaded', function () {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let total = 0;

    cartItems.forEach(({ price }) => {
        total += parseFloat(price);
    });

    const totalPaymentElement = document.getElementById("valor-compra");
    if (totalPaymentElement) {
        totalPaymentElement.textContent = total.toFixed(2);
    }

    const boletoTotalElement = document.getElementById("boleto-valor-compra");
    if (boletoTotalElement) {
        boletoTotalElement.textContent = total.toFixed(2);
    }
});


document.querySelectorAll('input[name="payment-method"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        document.querySelectorAll('.payment-method-info').forEach((info) => {
            info.style.display = 'none';
        });

        const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
        if (selectedMethod) {
            const methodId = selectedMethod.id + '-info';
            document.getElementById(methodId).style.display = 'block';
        }
    });
});


document.getElementById('botao_finalizar').onclick = function () {
    const inputs = document.querySelectorAll('input');
    let camposVazios = false;

    // Verifica se algum campo de input está vazio
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            camposVazios = true;
        }
    });

    // Se houver campos vazios, avisa o usuário
    if (camposVazios) {
        alert("Por favor, preencha todos os campos.");
        return;  // Interrompe a execução, evitando o redirecionamento
    }

    // Se não houver campos vazios, exibe o alerta e redireciona
    alert("Pagamento efetuado com sucesso");
    window.location.href = 'index.html';  // Redireciona para a página index.html
};



document.getElementById('botao_finalizar_boleto').onclick = function () {
    alert("Pagamento efeituado com sucesso");
    window.location.href = 'index.html'
}

function togglePaymentInfo() {
    const selectedPaymentMethod = getSelectedPaymentMethod();

    if (!selectedPaymentMethod) {
        hideAllPaymentInfo();
        return;
    }
    showPaymentInfo(selectedPaymentMethod + '-info');
}

function getSelectedPaymentMethod() {
    const selectedRadio = document.querySelector('input[name="payment-method"]:checked');
    return selectedRadio ? selectedRadio.id : 'none';
}

function hideAllPaymentInfo() {
    const paymentInfos = document.querySelectorAll('.payment-method-info');
    paymentInfos.forEach(info => {
        info.style.display = 'none';
    });
}


function applyCardMask(event) {
    let input = event.target;

    let value = input.value.replace(/\D/g, '');

    if (value.length > 16) {
        value = value.slice(0, 16);
    }

    // Adicionar a máscara: "#### #### #### ####"
    value = value.replace(/(\d{4})(\d)/, '$1 $2');
    value = value.replace(/(\d{4})(\d{4})(\d)/, '$1 $2 $3');
    value = value.replace(/(\d{4})(\d{4})(\d{4})(\d)/, '$1 $2 $3 $4');

    input.value = value.trim();
}

function acceptJustNumber(event) {
    let input = event.target;

    let value = input.value.replace(/\D/g, '');

    input.value = value.trim();
}

