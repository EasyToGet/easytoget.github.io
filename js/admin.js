const url = 'https://vue3-course-api.hexschool.io';
const path = 'easytoget';

const app = {
  data: {
    products: [],
  },
  getData() {
    axios.get(`${url}/api/${path}/admin/products`)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          this.data.products = res.data.products;
          this.render();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  },
  render() {
    const productListDom = document.querySelector('#productList');
    const productCountDom = document.querySelector('#productCount');
    // let template = '';
    // this.data.products.forEach((item) => {
    //   template = template + `
    //     <tr>
    //       <td>${item.title}</td>
    //       <td width="120">
    //         ${item.origin_price}
    //       </td>
    //       <td width="120">
    //         ${item.price}
    //       </td>
    //       <td width="100">
    //         <span class="">${item.is_enabled}</span>
    //       </td>
    //       <td width="120">
    //         <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove"
    //           data-id=""> 刪除 </button>
    //       </td>
    //     </tr>`;
    // })
    const template = this.data.products.map(item => `
      <tr>
        <td>${item.title}</td>
        <td width="120">
          ${item.origin_price}
        </td>
        <td width="120">
          ${item.price}
        </td>
        <td width="100">
          <span class="">${item.is_enabled}</span>
        </td>
        <td width="120">
          <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove"
            data-id="${item.id}"> 刪除 </button>
        </td>
      </tr>
    `).join('');
    productListDom.innerHTML = template;
    productCountDom.textContent = this.data.products.length;

    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach(btn => {
      // btn.addEventListener('click', this.deleteProduct);
      btn.addEventListener('click', this.deleteProduct.bind(this));
    })
  },
  deleteProduct(evt) {
    const id = evt.target.dataset.id;
    axios.delete(`${url}/api/${path}/admin/product/${id}`)
      .then((res) => {
        console.log(res);
        // app.getData();
        this.getData();
      })
      .catch((err) => {
        console.log(err);
      })
  },
  init() {
    // Cookie 取出
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    // axios.post(`${url}/api/user/check`) 
    //   .then((res) => {
    //     console.log(res);
    //   })
    this.getData();
  }
}
app.init();
