class Bibliotheque
 
   # Accès direct au tableau de livres
   attr_reader :livres
 
   # Méthode appelée à la création d'un objet bibliothèque qui initialise le tableau de livres
   def initialize
     @livres = []
   end
 
   # Ajoute un livre à la bibliothèque, s'il n'y est pas déjà
   def ajouter livre
     raise "Le livre #{livre} est déjà dans la bibliothèque" if @livres.include? livre
     @livres << livre
   end
 
   # Retourne le nombre de livres dans la bibliothèque
   def taille
     @livres.length
   end
 
   # Retourne la liste des auteurs ayant écrit ou co-écrit au moins un livre dans la bibliothèque
   def auteurs
     @livres.map { |livre| livre.auteurs }.flatten.uniq
   end
 end
