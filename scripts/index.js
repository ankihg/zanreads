
function init() {
  console.log('init');
  menuTree.makeClickEvents();
  Tree.generate();
  Flock.setListeners();
  Fog.init();
  Moon.init();
};







// $(document).ready(function() {
//   init();
// });
