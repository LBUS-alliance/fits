(() => {
  $('#fits').hide();
  $('#modals').hide();
  $('#loading').show();

  $.get('fits.yml', data => {
    const fits = jsyaml.load(data);

    let fits_list = '';
    let modals = '';

    for (const fit in fits) {
      let fit_text = fits[fit];

      fits_list += `
        <a class="collection-item modal-trigger fit" href="#modal-${fit}">
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
