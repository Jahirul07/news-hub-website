const loadCategory = async () => {

    try {
      const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
      const data = await res.json();
  
      return data.data.news_category;
  
  
    }
    catch (error) {
      console.log(error);
    }
  }
  
  const allCategory = async () => {
    const data = await loadCategory();
  
    const category = document.getElementById("categorey");
  
    for (const catagory of data) {
  
  
      const li = document.createElement('li')
      li.innerHTML = `
                    <a onclick="newsDetails(${catagory.category_id})" class="nav-link" href="#">${catagory.category_name}</a>`;
      category.appendChild(li);
        console.log(catagory.category_name);
    }
  }
  
  allCategory();
  
  const newsDetails = async (category_id) => {
    const url = (` https://openapi.programming-hero.com/api/news/category/0${category_id}`);
    // toggleSpiner(true);
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
  }
  
  
  
  
  const displayNews = allNews => {
    console.log(allNews);
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";
    allNews.forEach(news => {
        console.log(news)
      const notFound = document.getElementById("not-found");
      notFound.innerText = `${Object.keys(allNews).length} items found for category ${news.category_name}`;
    //   console.log(notFound);
      const { rating, total_view, title, author, thumbnail_url, image_url, details, _id } = news
      const div = document.createElement("div");
      div.innerHTML = ` <div class=" ca px-40 py-5 card card-side bg-base-100 shadow-xl">
        <figure><img class="w-80 h-80" src="${thumbnail_url}" alt="Movie"></figure>
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          <p>${details ? details.slice(0, 200) + '...' : details}</p>
         
  <div class=" flex justify-between">
    <div class=" flex gap-5 my-"> 
        <img class="w-10 h-10 rounded-full" src="${author.img}" alt="Movie">
        <h1>${author.name ? author.name : "No Data Found"}</h1>
        </div>
        
    <div class="flex gap-3">
    
        <h1>${total_view ? total_view : "No Data Found"}</h1>
       </div>
    
       <div>
       <label for="my-modal-6" onclick="loadModal('${_id}')" class="btn modal-button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
       <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
     </svg>
     </label>
       
      
       </div>
  </div>
         
        </div>
      </div>
      `;
  
      newsContainer.appendChild(div);
    });
  
    // toggleSpiner(false);
  }
  
  
  
  
  
  
  const loadModal = async (id) => {
    try {
      const url = `https://openapi.programming-hero.com/api/news/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      displayNewsDetails(data.data[0]);
    }
    catch (error) {
      console.log(error);
    }
  }
  // news shoup
  const displayNewsDetails = categoryNews => {
    console.log(categoryNews);
    const { rating, title, image_url, details, } = categoryNews;
  
    const divContainter = document.getElementById("modal-body")
    divContainter.innerHTML = `
     <h3 class="font-bold text-lg">${title}</h3>
        <p class="py-4">${details}</p>
        <p class="py-4"><i class="fa-solid fa-star-half-stroke"></i> ${rating.number}</p>
        
        <div><img class=" h-50" src="${image_url}"></div>
        <div class="modal-action">
        <label for="my-modal-6" class="btn">Close</label>
      </div>
     `;
  
  
  
  }