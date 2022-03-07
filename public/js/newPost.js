const URL = 'http://localhost:3000';
// parsisiusti visas kategorijas su fetch
// sugeneruoti jas formoj nurodant value ir name
async function getCategories() {
  const resp = await fetch(`${URL}/categories`);
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);
  // if (dataInJs.success === true) {
  //   renderPosts(dataInJs.data, postContainerEl);
  // }
}

getCategories();
