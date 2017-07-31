<?php
    if ($_SERVER['REQUEST_METHOD']=='GET'){
        $file = $_FILES['file'];
            $filename = $file['tmp_name'];
            // now let's define the things we need to send the request:
            $headers = array("Content-Type:multipart/form-data"); // cURL headers for file uploading
            $postfields = array(
                'f' => new \CURLFile($filename, urldecode($file['type']), $file['name'])
            );
            error_log(json_encode($request->files()));
            error_log(json_encode($file));
            error_log(json_encode($postfields));
            $curl = curl_init();
            $timeout = 1000;
            $ret = "";
            $url="https://zxing.org/w/decode";
            curl_setopt ($curl, CURLOPT_URL, $url);
            curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt ($curl, CURLOPT_HEADER, true);
            curl_setopt ($curl, CURLOPT_HTTPHEADER, $headers);
            //curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
            curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt ($curl, CURLOPT_POSTFIELDS, $postfields);
            curl_setopt ($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.0.5) Gecko/2008120122 Firefox/3.0.5");
            //curl_setopt ($curl, CURLOPT_CONNECTTIMEOUT, $timeout);
            $text = curl_exec($curl);
            error_log(curl_getinfo($curl,CURLINFO_HTTP_CODE));
            error_log(curl_error($curl)); //get error
            curl_close($curl);
            error_log($text);
            return $text;
    }

?>