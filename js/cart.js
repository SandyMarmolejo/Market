
    /* Carrito */

        function shoppingCart() {

            // Boton "Agregar al carrito" y Productos
                const addToShoppingCart = document.querySelectorAll( '.add-to-cart-btn' ); // Botón "Agregar al carrito"
                

                addToShoppingCart.forEach( ( addToCartButtons ) => {
                    addToCartButtons.addEventListener( 'click', addToCartBtnClick )
                });

                function addToCartBtnClick( event ) {
                    let btn = event.target;
                    const abarrotes = btn.closest( '.abarrote' );

                    // Productos
                        const abarroteImg = abarrotes.querySelector( '.abarrote-img' ).src;                        
                        const abarroteTitle = abarrotes.querySelector( '.abarrote-title' ).textContent;
                        const abarrotePrice = abarrotes.querySelector( '.abarrote-price' ).textContent;
                        
                
                    modalCart( abarroteImg, abarroteTitle, abarrotePrice );

                    cartCounterUpdate();
                    
                };    
               
                
            // Modal cart
                const showCart = document.querySelector( '.show-cart' );
                    
                function modalCart( abarroteImg, abarroteTitle, abarrotePrice ) {

                    // Que no se duplique el mismo producto en el Carrito
                        let abarrotesTitleRepeat = showCart.getElementsByClassName( 'shoppingCartabarroteTitle' );
                            
                        for( let i = 0; i < abarrotesTitleRepeat.length; i++ ) {
                            if( abarrotesTitleRepeat[i].innerHTML === abarroteTitle ) {
                                let abarrotesTitleQuantity = abarrotesTitleRepeat[i].parentElement.parentElement.querySelector( '.shoppingCartAbarroteQuantity' );
                                abarrotesTitleQuantity.value++;
                                cartTotalPrice();
                            
                                return;
                            }
                        };

                    const shoppingCartDiv = document.createElement( 'div' );
                    const cartModal =
                        ` 
                            <div class="row shoppingCartAbarrote mt-3 text-center">
                                <div class="col-3">
                                    <img src=${abarroteImg} class="imagenesModal"/>
                                    <h6 class="mt-2 shoppingCartabarroteTitle">${abarroteTitle}</h6>
                                </div> 
                                <div class="col-3">
                                    <p class="abarrote-price shoppingCartabarrotePrice">${abarrotePrice}</p>
                                </div>
                                <div class="col-3">
                                    <input class="text-center shoppingCartAbarroteQuantity inputCuenta" type="number" value="1">
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-danger" id="remove-abarrote-btn" data-name="${abarroteTitle}">
                                        x
                                    </button>
                                </div>
                            </div>
                        `
                                            
                    shoppingCartDiv.innerHTML = cartModal;
                    showCart.append( shoppingCartDiv );

                    // Botón Remove abarrote
                        const removeButton = shoppingCartDiv.querySelector( '#remove-abarrote-btn' );

                        removeButton.addEventListener( 'click', removeabarroteFromCart );

                    // Input Quantity
                        const inputCartQuantity = shoppingCartDiv.querySelector( '.shoppingCartAbarroteQuantity' );
                        
                        inputCartQuantity.addEventListener( 'change', cartQuantityChange );
                    
                        
                    cartTotalPrice();
                };

            // Cart Counter
                function cartCounterUpdate() {
                    const cartabarrotesLength = document.querySelectorAll( '.shoppingCartAbarrote' );
                    const cartCounter = document.querySelector( '#cart-counter' );
                    cartCounter.innerHTML = cartabarrotesLength.length;
                    cartTotalPrice();
                };  


            // Precio total del carrito
                function cartTotalPrice() {
                    var totalCount = 0;
                    const totalPrice = document.querySelector( '.total-price' );
                    const shoppingCartabarrotes = document.querySelectorAll( '.shoppingCartAbarrote' );
                    
                    shoppingCartabarrotes.forEach( ( shoppingCartAbarrote ) => {

                        const abarroteCartPriceElement = shoppingCartAbarrote.querySelector( '.shoppingCartabarrotePrice' );
                        const abarroteCartPrice = Number( abarroteCartPriceElement.textContent.replace( '$', '' ) );

                        const abarroteCartQuantityElement = shoppingCartAbarrote.querySelector( '.shoppingCartAbarroteQuantity' );
                        const abarroteCartQuantity = Number( abarroteCartQuantityElement.value );

                        totalCount += abarroteCartPrice * abarroteCartQuantity;
                    });

                    totalPrice.innerHTML = `$${totalCount.toFixed(2)}`;
                };

            // Eliminar abarroteas del carrito
                function removeabarroteFromCart(event) {
                    const removeBtnClicked = event.target;
                    removeBtnClicked.closest( '.shoppingCartAbarrote' ).remove();
                    cartTotalPrice();
                    cartCounterUpdate();
                };
                
            // Cantidad del carrito (Input)
                function cartQuantityChange(event) {
                    const inputCartChange = event.target;
                    inputCartChange.value <= 0 ? ( inputCartChange.value = 1 ) : null;
                    cartTotalPrice();
                    cartCounterUpdate();
                };

            // Finalizar compra
                const botonFinalizarCompra = document.querySelector( '.btn-finalizar-compra' );

                botonFinalizarCompra.addEventListener('click', finalizarCompraTotal);

                function finalizarCompraTotal() {
                    showCart.innerHTML = '';
                    cartTotalPrice();
                    cartCounterUpdate();
                };

            // Vaciar todo el carrito
                const botonVaciarCarrito = document.querySelector( '.btn-vaciar-carrito' );
                
                botonVaciarCarrito.addEventListener('click', vaciarCarritoCompleto);

                function vaciarCarritoCompleto() {
                    showCart.innerHTML = '';
                    cartTotalPrice();
                    cartCounterUpdate();
                };
        };
        
        shoppingCart();
        
        
                
                
       
            