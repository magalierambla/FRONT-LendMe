export function  truncatParagraphe(_text: string){

    const nbr_lettres = 200 ;

    if (_text.length > nbr_lettres) {

      return (_text.substring(0, nbr_lettres) + '...');

     } else {

       return _text + '.';
    }

  }

export function  truncatMessageRecusNonLus(_text: string){

    const nbr_lettres = 20 ;

    if (_text.length > nbr_lettres) {

      return (_text.substring(0, nbr_lettres) + '...');

     } else {

       return _text + '.';
    }


  }
export function  calculTempsEcoule(nbrMillesSecondes: number){

    const startTime = Date.now();

    let timeDiff = startTime - nbrMillesSecondes;

    // alert(startTime);

    timeDiff = timeDiff / 1000;

    // alert(timeDiff);

    const Minutes = Math.floor(timeDiff / 60);

    const Hours = Math.floor(Minutes / 60);

    const restMinutes = Hours * 60 - Minutes;

    const Days = Math.floor(Hours / 24);

    const restHours = Days * 24 - Hours;

    let tempsEcoule = '';  // tempsEcoule = Days + 'J ' + restHours + 'H ' + restMinutes + 'm' ;

    if (Days > 0){

      tempsEcoule = Days + 'J ' ;

    }

    if (Days <= 0 ){

      tempsEcoule = Hours + 'H ' ;

    }

    if (Hours <= 0 ){

      tempsEcoule = Minutes + 'm ' ;

    }

    return tempsEcoule;

  }
