<!doctype html>
<html lang="en">

<head>
  <title>Scot Living</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="index.css">
  <link rel="stylesheet" href="universal.css">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body style="background-color: #bfd6d9">
	<section id="home-page" style="background-color: #bfd6d9">
	<!-- Header -->
	<header>
		<div id="header-container" class="container" style="min-width: 100%">
			<div class="header-top d-flex justify-content-between pt-2">
				<div id="socials" class="d-flex justify-content-between w-15">
					<div class="item px-2">
						<a href="https://www.Facebook.com"><img src="Assets/Social_Media_Icons/facebook.png" alt="Facebook" height="25px"></a>
					</div>
					<div class="item px-2">
						<a href="https://www.Twitter.com"><img src="Assets/Social_Media_Icons/twitter.png" alt="Twitter" height="25px"></a>
					</div>
					<div class="item px-2">
						<a href="https://www.Instagram.com"><img src="Assets/Social_Media_Icons/instagram.png" alt="Instagram" height="25px"></a>
					</div>
					<div id="shopping-cart-one" class="item px-2">
						<a href="cart.html"><img src="Assets/General_Icons/carts.png" alt="Checkout" height="25px"></a>
					</div>
				</div> 
				<div id="info-big" class="column">
					<div class="row" style="height: 35px;">
						<div class="d-flex justify-content-between">
							<div class="item px-2">
								<p style="color: #353745; font-family: myFirstFont;"><img src="Assets/General_Icons/telephone.png" alt="Telephone" height="25px">+0131625432</p>
							</div>
							<div class="item px-2">
								<p data-toggle="modal" data-target="#form" class="linear-wipe"><img src="Assets/General_Icons/customer-service-agent.png" alt="Location" height="25px" style="padding-right: 2px;">Request a call back</p>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="item px-2" style="margin: auto; height: 25px;">
							<p class="linear-wipe" onclick="doScrolling('#map-container', 1000)"><img src="Assets/General_Icons/placeholder.png" alt="Location" height="25px">Newton Stewart</p>
						</div>
					</div>
				</div>
				<div id="info-small" class="column">
					<div class="row" style="height: 35px;">
						<div class="d-flex justify-content-between">
							<div id="shopping-cart-two" class="item px-2">
								<a href="cart.html"><img src="Assets/General_Icons/carts.png" alt="Checkout" height="25px"></a>
							</div>
							<div class="item px-2">
								<a href="tel:+447522264097"><img src="Assets/General_Icons/telephone.png" alt="Telephone" height="25px"></a>
							</div>
							<div class="item px-2">
								<img class="linear-wipe" onclick="doScrolling('#map-container', 1000)" src="Assets/General_Icons/placeholder.png" alt="Location" height="25px">
							</div>
							<div class="item px-2">
								<p data-toggle="modal" data-target="#form" class="linear-wipe"><img src="Assets/General_Icons/customer-service-agent.png" alt="Location" height="25px" style="padding-right: 2px;">Request a call back</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>

	<div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
		  <div class="modal-content">
			<div class="modal-header border-bottom-0">
			  <h5 class="modal-title" id="exampleModalLabel">We'll call you as soon as we can...</h5>
			  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			  </button>
			</div>
			<form class="contact-form" action="contactform.php" method="post">
			  <div class="modal-body">
				<div class="form-group">
				  <label class="form-label">Name</label>
				  <input class="details-input" name="name" type="text" placeholder="Enter name">
				</div>
				<div class="form-group">
				  <label class="form-label">Email</label>
				  <input class="details-input" name="email" type="text" placeholder="Enter your email">
				</div>
				<div class="form-group">
				  <label class="form-label">Telephone</label>
				  <input class="details-input" name="phonenumber" type="text" placeholder="Enter your telephone number">
				</div>
			  </div>
			  <div class="modal-footer border-top-0 d-flex justify-content-center">
				<label type="submit" name="submit" data-dismiss="modal" class="btn btn-primary btn-success">Call me back</label>
			  </div>
			</form>
		  </div>
		</div>
	  </div>

</div>

	<div class="second-header-top">
		<div class="logo">
		<a href="index.php"><img src="Assets\Scot_Living_Logos\Logo\Standard Logo Files\Original_on_Transparent_15.png" class="img-fluid" alt="Scot Living"></a></div>
		<div class="search-container">
			<form action="searchdb.php" method="post">
				<input name="search" class="search-input" type="text" placeholder="Search for products & inspiration">
				<button type="submit" name="submit">Search</button>
			</form>
		</div>
	</div>

	
	<nav class="navbar navbar-expand-lg navbar-light navbar-custom py-0" style="background-color: #353745">
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		  <span class="navbar-toggler-icon"></span>
		</button>
		<div class="navbar-search">
			<input class="search-input" style="margin-top: 3px;" type="text" placeholder="Search for products">
		</div>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
		  <ul class="navbar-nav mr-auto">
			<li class="nav-item">
			  <a class="nav-link" href="#">Offers</a>
			</li>
			<li class="nav-item">
			  <a class="nav-link" href="fabricsofas.html">Fabric Sofas</a>
			</li>
			  <li class="nav-item">
				<a class="nav-link" href="#">Leather Sofas</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="#">Corner Sofas</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="#">Recliners</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="#">Sofa Beds</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="#">Dining</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="#">Bedroom</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="#">Beds</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="#">Mattresses</a>
			  </li>
			  <li class="nav-item">
				<a id="checkout-link" class="nav-link" href="cart.html">Checkout</a>
			  </li>
		  </ul>
		</div>
	</nav>

	  <!-- Slideshow -->
	<div class="slideshow">
	  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
		<ol class="carousel-indicators" style="max-width: 100%; max-height: 100%;">
		  <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
		  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
		  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
		</ol>
		<div class="carousel-inner">
		  <div class="carousel-item active">
			<img class="d-block w-100" style="max-height: 708px;" src="Pictures\sofablue.jpg" alt="First slide">
		  </div>
		  <div class="carousel-item">
			<img class="d-block w-100" style="max-height: 708px;" src="Pictures\bedroom.jpg" alt="Second slide">
		  </div>
		  <div class="carousel-item">
			<img class="d-block w-100" style="max-height: 708px;" src="Pictures\diningroom.jpg" alt="Third slide">
		  </div>
		</div>
		<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
		  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
		  <span class="sr-only">Previous</span>
		</a>
		<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
		  <span class="carousel-control-next-icon" aria-hidden="true"></span>
		  <span class="sr-only">Next</span>
		</a>
	  </div>
	</div>

	<div class="image-row">
		
			<div class="shop-now-container">
				<a href="fabricsofas.html">
					<img id="shop-now-one" src="Pictures/fabric-sofa.jpg" alt="Fabric Sofas">
					<button type="button" class="btn btn-outline-light btn-lg" data-mdb-ripple-color="dark">
				Shop Now
			  </button>
				</a>
			</div>
		
		
			<div class="shop-now-container">
				<a href="https//google.com">
					<img id="shop-now-two" src="Pictures/corner-sofa.jpg" alt="Fabric Sofas">
					<button type="button" class="btn btn-outline-light btn-lg" data-mdb-ripple-color="dark">
						Shop Now
					</button>
				</a>
			</div>
		
		
			<div class="shop-now-container">
				<a href="https//google.com">
					<img id="shop-now-three" src="Pictures/leather-sofa.jpg" alt="Fabric Sofas">
					<button type="button" class="btn btn-outline-light btn-lg" data-mdb-ripple-color="dark">
						Shop Now
					</button>
				</a>
			</div>
		
		
			<div class="shop-now-container">
				<a href="https//google.com">
					<img id="shop-now-four" src="Pictures/sofa-bed.jpg" alt="Fabric Sofas">
					<button type="button" class="btn btn-outline-light btn-lg" data-mdb-ripple-color="dark">
						Shop Now
					</button>
				</a>
			</div>
		
	</div>

	<div id="map-container" class="map-container">
		<div class="the-container">
			<div class="business-info">
				<div class="opening-times">
				<h1>Opening Times</h1>
				<h2 id="Monday">Monday: 09:00 - 17:00</h2>
				<h2 id="Tuesday">Tuesday: 09:00 - 17:00</h2>
				<h2 id="Wednesday">Wednesday: closed</h2>
				<h2 id="Thursday">Thursday: 09:00 - 17:00</h2>
				<h2 id="Friday">Friday: 09:00 - 17:00</h2>
				<h2 id="Saturday">Saturday: 09:00 - 17:00</h2>
				<h2 id="Sunday">Sunday: closed</h2>
				</div>
				<hr class="divider">
				<div class="address">
				<h3>64-68 Victoria St,</h3>
				<h3>Newton Stewart,</h3>
				<h3>DG8 6DB</h3>
				</div>
			</div>
			<div class="map-div">
				<iframe class="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9163.09488982057!2d-4.4833357!3d54.9595295!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x36eb7d674c45ac9!2sNorman%20Furnishings!5e0!3m2!1sen!2suk!4v1625054019827!5m2!1sen!2suk" title="" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
			</div>
		</div>
	</div>

	<div class="socials-container-bottom" style="width: 100%;">
	<div id="socials-bottom" class="row" style="margin: auto; justify-content: center; padding-top: 0.5%; padding-bottom: 1%;">
		<div>
			<a href="https://www.Facebook.com"><img src="Assets/Social_Media_Icons/facebook.png" alt="Scot Living Facebook" height="25px"></a>
		</div>
		<div style="padding-left: 3%; padding-right: 3%;">
			<a href="https://twitter.com/scot_living"><img src="Assets/Social_Media_Icons/twitter.png" alt="Scot Living Twitter" height="25px"></a>
		</div>
		<div>
			<a href="https://www.instagram.com/scotliving/"><img src="Assets/Social_Media_Icons/instagram.png" alt="Scot Living Instagram" height="25px"></a>
		</div>
	</div> 
</div>
	

	<!-- Optional JavaScript -->
  <script type="text/javascript" src='index.js'> </script>
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
    crossorigin="anonymous"></script>
	</section>
</body>
</html>