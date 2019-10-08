let np = window.prompt('Nom et prénom :');
np = np.split(' ');
alert('Bonjour '+np[0].toUpperCase()+' '+np[1].charAt(0).toUpperCase()+np[1].toLowerCase().slice(1));