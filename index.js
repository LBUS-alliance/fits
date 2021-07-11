var fits = {};

(() => {
  $('body').css({ backgroundColor: '#303437', color: 'white' });

  $('#fits').hide();
  $('#modals').hide();
  $('#loading').show();

  $.get('fits.yml', data => {
    fits = jsyaml.load(data);

    let fits_list = '';
    let modals = '';

    for (const fit in fits) {
      let fit_text = fits[fit];

      fits_list += `
        <a class="collection-item modal-trigger fit" id="${fit}" href="#modal-${fit}">
          ${fit}
        </a>
      `;

      let fit_html = '';
      for (const line of fit_text.split("\n")) {
        fit_html += line + '<br>';
      }

      modals += `
        <div id="modal-${fit}" class="modal modal-fixed-footer">
          <div class="modal-content">
            <h4>${fit}</h4>
            <p>${fit_html}</p>
          </div>
          <div class="modal-footer">
            <button class="waves-effect waves-teal btn-flat" id="modal-copy-${fit}" onclick="copyFit('modal-copy-${fit}', \`${fit_text}\`)">Copy</button>
            <button class="modal-close waves-effect waves-teal btn-flat">Close</button>
          </div>
        </div>
      `;
    }

    $('#loading').hide();
    $('#fits').html(fits_list);
    $('#modals').html(modals);

    $('.fit').css({ backgroundColor: '#303437', color: 'white' });
    changeFitColor(fits, 'white', '#26a69a', '#303437', 'white');
    $('.modal').css({ backgroundColor: '#303437', color: 'white' });
    $('.modal-footer').css({ backgroundColor: '#303437', color: 'white', borderTop: '1px solid rgba(0,0,0,0.4)' });
    $('.modal-footer button').removeClass('btn-flat').addClass('btn');

    $('#fits').show();
    $('#modals').show();
    $('.modal').modal();
  });
})();

const copyFit = (id, fit) => {
  navigator.clipboard.writeText(fit);
  $(`#${id}`).html('Copied!');
  setTimeout(() => {
    $(`#${id}`).html('Copy');
  }, 3000);
};

const toggleColorMode = () => {
  if ($('#color-mode').html() === '<img src="moon.svg">') {
    // switch to light mode
    $('#color-mode').html(`<img src="sun.svg"/>`);
    $('body').css({ backgroundColor: 'white', color: 'black' });
    $('.fit').css({ backgroundColor: 'white', color: '#26a69a' });
    if (!fits) {
      $.get('fits.yml', data => {
        fits = jsyaml.load(data);
        changeFitColor(fits, '#eceff1', '#26a69a', 'white', '#26a69a');
      });
    } else {
      changeFitColor(fits, '#eceff1', '#26a69a', 'white', '#26a69a');
    }
    $('.modal').css({ backgroundColor: 'white', color: 'black' });
    $('.modal-footer').css({ backgroundColor: 'white', color: 'black', borderTop: '1px solid rgba(0,0,0,0.1)' });
    $('.modal-footer button').removeClass('btn').addClass('btn-flat');
  } else {
    // switch to dark mode
    $('#color-mode').html(`<img src="moon.svg"/>`);
    $('body').css({ backgroundColor: '#303437', color: 'white' });
    $('.fit').css({ backgroundColor: '#303437', color: 'white' });
    if (!fits) {
      $.get('fits.yml', data => {
        fits = jsyaml.load(data);
        changeFitColor(fits, 'white', '#26a69a', '#303437', 'white');
      });
    } else {
      changeFitColor(fits, 'white', '#26a69a', '#303437', 'white');
    }
    $('.modal').css({ backgroundColor: '#303437', color: 'white' });
    $('.modal-footer').css({ backgroundColor: '#303437', color: 'white', borderTop: '1px solid rgba(0,0,0,0.4)' });
    $('.modal-footer button').removeClass('btn-flat').addClass('btn');
  }
};

const changeFitColor = (fits, bgIn, textIn, bgOut, textOut) => {
  for (const fit in fits) {
    const element = $(`#${fit}`);
    element.hover(
      () => element.css({ backgroundColor: bgIn, color: textIn }),
      () => element.css({ backgroundColor: bgOut, color: textOut })
    );
  }
};
