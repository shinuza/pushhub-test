<?php
$ge = file("/path/to/dat_files.txt");
sort($the_page);
for($index = 0; $index < count($the_page); $index++)
{
$the_page[$index] = ereg_replace("\n", "", $the_page[$index]);
$meta = get_meta_tags($the_page[$index]);
  if ($meta["description"] != "") 
{ 
   if(eregi($search_criteria, $meta["description"]))
   {
     $results[] = $the_page[$index];
     $size++;
     $flag = 1;
   }
}
  if ($meta["keywords"] != "" && $flag < 1) 
{ 
   if(eregi($search_criteria, $meta["keywords"]))
   {
     $results[] = $the_page[$index];
     $size++;
   }
}
  if ($flag == 1)
{
   $description[] = $meta["description"];
  $flag = 0;
}
}
$size = count($results);
print("I found $size occurences of $search_criteria in the diary pages meta tags");
if ($size > 0)
{
print("<br>Here are your urls to visit:<p><ol>");
  for($index = 0; $index < $size; $index++)
{
   print("<li>$description[$index] ");
   print("<a href=\"$url/$results[$index]\">");
   print("$results[$index]</a></li>");
}
print("</ol>");
}
?>
