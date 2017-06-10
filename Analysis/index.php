<?php
    include('./credentials.php');
    echo ("running");

    $conn = new mysqli($serverhost, $username, $password, "coin_db", $port);

    if($conn->connect_errno > 0){
        die('Unable to connect to database [' . $conn->connect_error . ']');
    }

    $newTags = [];
    $newTagsToItem = [];

    $max = 1000000;
    $counter = 0;

    $selectItems = "SELECT ItemId, Title FROM SearchItems LIMIT ".$max;
    $fetchResult = $conn -> query($selectItems);

    while(($item = $fetchResult -> fetch_assoc()) !== FALSE) {
        if($counter > $max) {
            break;
        }

        $words = explode(" ", $item['Title']);

        foreach ($words as $word) {
            if (strlen($word) > 2) {

                $value = strtolower(trim($word));
                $value = preg_replace('/[^a-zA-Z0-9 ]/', '', $value);
                $raw = preg_replace('/[^a-zA-Z0-9 ]/', '', $word);

                // check all title
                $tagQuery = "SELECT id FROM Tag where value = '".$value."'";

                $tagResult = $conn -> query($tagQuery) -> fetch_assoc();

                // print($word." ".count($tagResult)."<br/>");

                if (count($tagResult) == 0) {

                    // add to db
                    $addTagQuery = "INSERT INTO Tag (value, raw) VALUES ('".$value."','".$raw."')";
                    $result = $conn -> query($addTagQuery);

                    if (!$result) {
                        throw new Exception("Database Error [{".$conn->errno."}] {".$conn->error."}");
                    }

                    $tagId = $conn->insert_id;
                    $itemId = $item["ItemId"];

                    array_push($newTags, $tagId);

                    $addTagToItemQuery = "INSERT INTO TagToItem (TagId, ItemId) VALUES (".$tagId.",".$itemId.")";
                    $result = $conn -> query($addTagToItemQuery);

                    if (!$result) {
                        throw new Exception("Database Error [{$conn->errno}] {$conn->error}");
                    }

                    array_push($newTagsToItem, $conn -> insert_id);
                } else {
                    $tagId = $tagResult['id'];
                    $itemId = $item["ItemId"];

                    // check if tagToItem is in db
                    $tagToItemQuery = "SELECT * FROM TagToItem WHERE TagId = ".$tagId." AND ItemId = ".$itemId;
                    $result = $conn -> query($tagToItemQuery);

                    if (!$result) {
                        throw new Exception("Database Error [{$conn->errno}] {$conn->error}");
                    }

                    if (count($result -> fetch_assoc()) < 1) {
                        // not yet in sysyem -> add it
                        $addTagToItemQuery = "INSERT INTO TagToItem (TagId, ItemId) VALUES (".$tagId.",".$itemId.")";
                        $result = $conn -> query($addTagToItemQuery);

                        if (!$result) {
                            throw new Exception("Database Error [{$conn->errno}] {$conn->error}");
                        }

                        array_push($newTagsToItem, $conn -> insert_id);
                    }
                }
            }
        }

        $counter++;
    }

    print("Added new Tag rows: ".count($newTags));
    print("<br/>");
    print("Added new TagToItem rows: ".count($newTagsToItem));

    /*
    while($item = $conn -> query($selectItems) -> fetch_assoc()) {
        print 'nooo';
        //$words = str_split($item['Title']);

        //echo $item['Title'];

        /*
        foreach ($words as $word) {
            if (count($word) > 2) {

                $value = strtolower(trim($word));

                echo $value;
                // check all title
                $tagQuery = "SELECT id FROM tag where value = ".$value;

                /*
                echo $tagQuery;

                $tagResult = $conn -> query($tagQuery);

                if ($tagResult == null) {
                    $tagFetch = $tagResult -> fetch_assoc();
                    // word not in list
                    // add to db
                    $addTagQuery = "INSERT INTO Tag (value, raw) VALUES (".preg_replace('/[^a-zA-Z0-9 ]/g', '', $value).",".preg_replace('/[^a-zA-Z0-9 ]/g', '', $item.word)."(";
                    $conn -> query($addTagQuery);


                } else {
                    print('word is in db');
                }
                *
            }
        }
        *
    }
    */
?>
