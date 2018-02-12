import React from 'react';

const Carousel = () => (
  <div class="carousel-wrapper">
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="item active">
                <img src="/images/coffee.jpg" href="#" alt="Coffee recipes" />
                <div class="carousel-caption">
                    <a href="recipes"><h2>Coffee Recipes</h2>
                        <p>Cappuccinos, Lattes and more</p></a>
                </div>
            </div>
            <div class="item">
                <img src="/images/smoothie.jpg" href="#" alt="Smoothie recipes" />
                <div class="carousel-caption">
                    <a href="recipes"><h2>Smoothie Recipes</h2>
                        <p>jsdjashdjsakhfjksdhjfha</p></a>
                </div>
            </div>
            <div class="item">
                <img src="/images/tea.jpg" alt="Tea recipes" />
                <div class="carousel-caption">
                    <a href="recipes"><h2>Tea Recipes</h2>
                    <p>jsdjashdjsakhfjksdhjfha</p></a>
                </div>
            </div>
      </div>
      <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
      </a>
    </div>
</div>
);

export default Carousel;