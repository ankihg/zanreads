
function init() {
  console.log('init');
  menuTree.makeElements();
  Tree.generate();
  Flock.setListeners();
  Fog.init();
  Moon.init();
};







// $(document).ready(function() {
//   init();
// });
