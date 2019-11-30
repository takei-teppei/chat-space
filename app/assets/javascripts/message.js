$(function(){
  function buildHTML(message){
    var image =  message.image.url?`<img class="chat_contents__message" src="${message.image.url}">`:"";
      var html = `<div class="chat_contents__top--username">
                    ${message.name}
                  </div>
                  <div class="chat_contents__top--datetimes">
                    ${message.date}
                  </div>
                  <p class="chat_contents__message">
                    ${message.content}
                  </p>
                  ${image}`
    return html
  }

  $('#new_message').on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url, 
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })  
    .done(function(message){
      var html = buildHTML(message);
      $('.chat_contents').append(html)
      $('#new_message')[0].reset();
      $('.chat_contents').animate({ scrollTop: $('.chat_contents')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.form__btn--submit').prop('disabled', false);
    });
  })
});