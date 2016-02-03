
function init() {
  console.log('init');
  menuTree.makeClickEvents();
  Tree.generate();
  Flock.setListeners();
  Fog.init();
};







// $(document).ready(function() {
//   init();
// });
