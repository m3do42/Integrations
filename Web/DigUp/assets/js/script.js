$(document).ready(function() {

    ///////////////////
    //SLIDER ARTICLES//
    ///////////////////

    //Récupération des éléments utiles
    $prevArticles = $("#prev-articles");
    $nextArticles = $("#next-articles");
    $articlesLists = $(".articles-list");

    //Variables utiles
    articlesListsLenght = $articlesLists.size() - 1; //Nombre de listes d'articles (size par de 1 pour compter, mais pour être en accord avec les autres méthodes qui partent de 0, on soustrait 1)
    currentArticlesList = 0; //Liste actuellement affichée - on commence à zéro
    animation = false; //Cette variable permet de dire quand une animation est en cours, afin de bloquer les autres actions

    //Précision : Dans le cours du matin, nous avons empéché l'utilisateur d'aller trop loin en vérifiant s'il n'était pas au bout. Dans cet exemple, on se content de cacher les flèches quand nécessaire, ce qui empêche l'utilisateur d'aller trop loin également (juste une manière différente de faire la même chose)
    //Au clic sur nextArticles
    $nextArticles.click(function() {
        if(!animation) { //Pour changer de liste, il ne faut pas qu'une animation soit déjà en cours
            animation = true; //On active la variable animation pour empêcher des animations multiples
            //La liste actuelle disparaît en fondu
            $articlesLists.eq(currentArticlesList).fadeOut(300, function() {
                //Lorsque le fondu est fini (fonction de callback), on incrémente CurrentArticles et on affiche la bonne liste
                currentArticlesList++;
                $articlesLists.eq(currentArticlesList).fadeIn(300, function() {
                    animation = false; //C'est bon, une autre animation peut être lancée maintenant que la nouvelle liste est apparue
                });
            });
            //Si on est arrivé à la dernière liste, il faut cacher la flèche #nextArticles pour ne pas pouvoir aller plus loin
            if(currentArticlesList == articlesListsLenght-1) {
                $nextArticles.hide();
            }
            //Et si on est allé en avant, c'est qu'on peut revenir en arrière, on affiche donc la flèche #prevArticles
            $prevArticles.show();
        }
    });

    //Au clic sur prevArticles, c'est la même chose avec quelques modifications
    $prevArticles.click(function() {
        if(!animation) {
            animation = true;
            $articlesLists.eq(currentArticlesList).fadeOut(300, function() {
                currentArticlesList--; //Cette fois, on décrémente
                $articlesLists.eq(currentArticlesList).fadeIn(300, function() {
                    animation = false;
                });
            });
            //C'est la flèche prevArticles qu'on cache une fois qu'on est revenu au début
            if(currentArticlesList == 1) {
                $prevArticles.hide();
            }
            //Et c'est la flèche nextArticle qu'on affiche pour pouvoir avancer à nouveau
            $nextArticles.show();
        }
    });

    //////////////////////////
    //SELECTION D'ENTRETIENS//
    //////////////////////////

    //On récupère les éléments utiles
    $nbEntretiens = $("#nbEntretiens");
    $addEntretien = $(".addEntretien");
    $removeEntretien = $(".removeEntretien");

    //Au clic sur un bouton ajouter
    $addEntretien.click(function(e) {
        e.preventDefault(); //Il y a un lien sur cette partie mais cette action permet de ne pas en tenir compte
        $(this).css("display", "none"); //On cache le bouton sur lequel on a cliqué. $(this) désigne l'élement qui a déclanché l'évènement
        $(this).parent().addClass("entretienSelected"); //On ajoute au parent du span bouton, soit le h4, une classe définie en CSS pour le faire ressortir
        $(this).next(".removeEntretien").css("display", "block"); //On affiche le bouton qui permet de retirer l'entretien
        currentNbEntretiens = parseInt($nbEntretiens.html()); //On récupère le nombre actuel d'entretiens sélectionner. ParseInt permet de récupérer un chiffre et non une chaîne de caractère, sans quoi on ne pourrait pas faire l'addition qui suit
        $nbEntretiens.html(currentNbEntretiens+1); //On incrémente le nombre d'entretiens sélectionnés
    });

    //Au clic sur un bouton retirer, c'est à peu de choses près pareil
    $removeEntretien.click(function(e) {
        e.preventDefault();
        $(this).css("display", "none"); 
        $(this).parent().removeClass("entretienSelected"); //removeClass au lieu de addClass
        $(this).prev(".addEntretien").css("display", "block"); //prev car le bouton plus est avant dans le DOM
        currentNbEntretiens = parseInt($nbEntretiens.html()); 
        $nbEntretiens.html(currentNbEntretiens-1); //On décrémente le nombre d'entretiens
    });

    //////////////////////
    //OUVERTURE DIGUP TV//
    //////////////////////

    //On récupère les éléments utiles
    $films = $("#videos li");
    $filmsPlay = $("#videos .play");

    //Au clic sur un bouton play
    $filmsPlay.click(function(e) {
        e.preventDefault(); //Il y a un lien sur cette partie mais cette action permet de ne pas en tenir compte
        $(this).parents("li").addClass("active"); //On ajoute la classe active au parent de l'élément cliqué, désigné par $(this), soit le <li> du film
        //On fait disparaître les li n'ayant pas la classe active
        $films.not('.active').animate({
            height: 0,
        }, 300, function() {
            $(this).css("display", "none"); //La fonction de callback permet de faire disparaître totalement les éléments après animation, pour ne pas être ennuyé par leurs margin/padding
        });
        //On fait prendre la totalité de la place à la li active
        $films.filter('.active').animate({
            height: 480,
        }, 300);
    });

});