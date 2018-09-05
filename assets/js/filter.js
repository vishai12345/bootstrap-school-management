$(document).ready(function () {
  $('#filteremp').on('click', function () {
    $('.cards').fadeOut(500, function () {
      $('.cards').hide()
      $('.employee').show().fadeIn()
    })
  })

  $('#filtercli').on('click', function () {
    $('.cards').fadeOut(500, function () {
      $('.cards').hide()
      $('.client').show().fadeIn()
    })
  })

  $('#filterstu').on('click', function () {
    $('.cards').fadeOut(500, function () {
      $('.cards').hide()
      $('.student').show().fadeIn()
    })
  })

  $('#filtercities').on('click', function () {
    $('.cards').show().fadeIn()
  })
})
