function changeBackgroundColor() {
    var button = document.querySelector('.top-bar button.change-color');
    var text = button.textContent.trim();
    var coloredText = '';

    for (var i = 0; i < text.length; i++) {
        var randomColor = getRandomColor();
        coloredText += '<span style="color: ' + randomColor + '">' + text[i] + '</span>';
    }

    button.innerHTML = coloredText;
    document.body.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    return 'rgb(' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) +
    ')';
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

