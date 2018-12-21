// Change button style on hover
$('.legend-button').hover(
  function(e) {
       $(e.target).toggleClass('inactive-icon')
       $( e.target ).next().toggleClass( "inactive-icon" );
  }, function(e) {
    $(e.target).toggleClass('inactive-icon')
    $( e.target ).prev().toggleClass( "inactive-icon" );
  }
);

// $('.legend-button').click(function(e){
//   showMenu()
// })

// function showMenu(){
//   if ($('.opened').is(':visible')) {
//     // Change icon in legend button
//     $('.opened').hide()
//     $('.closed').show()
//     // Change hover behavior of the legend button
//     $('.closed').children().each(function(){
//       $(this).toggleClass('inactive-icon')
//     })
//     // Toggle Display of legend panel
//     $('.legend-panel').show();
//   } else {
//     // Change icon in legend button
//     $('.opened').show()
//     $('.closed').hide()
//     // Change hover behavior of the legend button
//     $('.closed').children().each(function(){
//       $(this).toggleClass('inactive-icon')
//     })
//     // Toggle Display of legend panel
//     $('.legend-panel').hide()
//   }
// }
//
// showMenu()
