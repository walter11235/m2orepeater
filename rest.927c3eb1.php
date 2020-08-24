<?php
    // 
    
    /**
     * ToDo: Documentation
     * 
     * Method: POST, PUT, GET etc
     * Data: array("param" => "value") ==> index.php?param=value
     * 
     * @method callAPI
     * 
     * @author hnguyen
     * @param String $method ???
     * @param String $url ???
     * @param String $data ???
     * @return String The Result of the Directus response.
     */
    function callAPI($method, $url, $data = false){
        $curl = curl_init();

        switch ($method)
        {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);
                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_PUT, 1);
                break;
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }

        // Optional Authentication:
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        //curl_setopt($curl, CURLOPT_USERPWD, "username:password");
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);
        
        curl_close($curl);

        return $result;
    }
    //print json_encode(callAPI("GET","http://localhost:2443/corporationwebsite/fields/customer_reference_teaser"));

    /**
     * @method getCollection
     * 
     * @author hnguyen
     * 
     * @param String $collectionName The name of the collection to search for.
     * @return Array The Result of the Directus response as array.
     */
    function getCollection($collectionName) {
        $collection = callAPI("GET", DIRECTUS_URL . 'collections/' . $collectionName);
        $records = json_decode($collection,true);
        return $records["data"]["fields"];
    }

    
    /**
     * Review thartmann: Really needed? Looks like getCollection
     */
    function getField($collectionName) {
        $str = "http://localhost:2443/corporationwebsite/collections" . '/' . $collectionName;
        $collection = callAPI("GET",$str);
        $records = json_decode($collection,true);
        return $records["data"]["fields"];
    }
    
    
    
    /**
     * Review thartmann: 
     * ToDo: Documentation, see above....
     */
    function getItems($collectionName) {
        $item = callAPI("GET", DIRECTUS_URL . 'items/' . $collectionName);
        $record = json_decode($item, true);
        return $record["data"];
    }

    /**
     * Review thartmann: 
     * ToDo: Documentation, see above....
     */
    function getItemByID($collectionName, $itemID) {
        $item = callAPI("GET", DIRECTUS_URL . 'items/' . $collectionName . '/' . $itemID);
        $record = json_decode($item, true);
        return $record["data"];
    }

    /**
     * Review thartmann: 
     * ToDo: Documentation, see above....
     */
    function getItemByIdentifier($collection, $identifier) {
        $items = callAPI("GET", DIRECTUS_URL . 'items/' . $collection);
        $record = json_decode($items, true);
        $key = array_search($identifier, array_column($record["data"], 'identifier'));
        return $record["data"][$key];
    }

    /**
     * Review thartmann: 
     * ToDo: Documentation, see above....
     */
    function getFileByID($fileID) {
        $item = callAPI("GET", DIRECTUS_URL . 'files/' . $fileID);
        $record = json_decode($item, true);
        if (!isset($record["data"]["data"]["full_url"])) {
            return null;
        }
        return $record["data"]["data"]["full_url"];
    }

    /**
     * Review thartmann: 
     * ToDo: Documentation, see above....
     */
    function sortCollection(&$collectionName) {
        // sort array with "sort" attribute, & to make the function call by reference
        usort($collectionName, function($a, $b) {
            return $a['sort'] <=> $b['sort'];
        });
    }

    /**
     * Review thartmann: Really needed?
     * ToDo: Documentation, see above....
     */
    function getPurifiedArray($itemOrCollection) {
        $result = $itemOrCollection;
        unset($result["id"]);
        unset($result["status"]);
        unset($result["sort"]);
        unset($result["owner"]);
        unset($result["created_on"]);
        unset($result["modified_by"]);
        unset($result["modified_on"]);
        return $result;
    }

    /**
     * Review thartmann: 
     * ToDo: We have to implement this in a generic way...
     */
    function getTranslationContent($collectionId, $languageOption) {
        $item = getItems("advertisement_teaser_translation");
        foreach ($item as $element) {
            if ($element["advertisement_teaser"] == $collectionId && $element["language"] == $languageOption) {
                return array($element["headline"], $element["description"]);
            }
        }
    }



    function getm2oNoteAndSortArray($collectionName) {
        
        // initial result for later return
        $noteArray = array();	
        $sortArray = array();

        $distinguishNumber = 1000;
        // in collectionName type Array
        foreach($collectionName as $itemName => $itemAttribute) {
            if($itemAttribute["type"] == "m2o") {
                //change "_" to "-"
                $string = str_replace("_","-",$itemAttribute["note"]);
                array_push($noteArray,$string);
                if ($itemAttribute["sort"] === null) {
                    // if sort is null, push 10000 so it would come at the end
                    array_push($sortArray,$distinguishNumber);
                    $distinguishNumber++;
                    continue;
                }
                array_push($sortArray,$itemAttribute["sort"]);
            }	
            
        }

        return array($noteArray, $sortArray);
    }


    function zipTwoArrayByValue($array1 ,$array2 ) {
        $result = array();
        foreach (array_keys($array2) as $k) {
            $result[k] = $array1[k];
        }
    }

    
    function zipTwoArray($noteArray,$homepageItem) {
        $result = array();

        foreach($noteArray as $index => $key) {
            $t = array();
            foreach($homepageItem as $value) {
                $t[] = $value[$index];
            }
            $result[$key]  = $t;
        }

        return $result;
    }

    

    function getAnotherRelationName($item) {
        //$collectionName
    }
?>