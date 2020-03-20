<?php
header('Access-Control-Allow-Origin: *');

if($_POST) {

    $data = $_POST;

    $opt = 0;
    $data['options'] = json_decode($data['options'], true);
    foreach ($data['options'] as $option){
        if (isset($option['value'])){
          if($option['value']){
            $opt++;
          }
        }
    }

    $messToUser  = "Вы забронировали автомобиль"."<br />";
    $messToUser .= "Ваш заказ не был оплачен."."<br />";
//    $messToUser .= "Для подтверждения, нужно оплатить заказ в течение 20 минут. Неподтвержденный заказ будет автоматически аннулирован."."<br />";
    $messToUser .= "Заказ: Автомобиль: ".$data['car'].", цвет - ".$data['color']."."."<br />";
    $messToUser .= "Данные арендатора: ".$data['name'].", ".$data['phone'].", ".$data['email']."<br />";
    $messToUser .= "Сумма предоплаты: ".$data['sum']."руб."."<br />";
    $messToUser .= "Даты аренды: с ".$data['df']." по ". $data['dt']."<br />";
    $messToUser .= "Место подачи: ".$data['place']."<br />";

    if ($opt > 0){
        $messToUser .= "Дополнительные опции:<br />";
        $messToUser .= "<table>";
        foreach ($data['options'] as $option){
            if (isset($option['value'])){
                        if($option['value']){
                              $messToUser .= "<tr>";
                              $messToUser .= "<td>".$option['name']."</td>";
                              if ($option['type'] === 'full'){
                                  $messToUser .= "<td>".$option['price']." руб.</td>";
                              }else{
                                  $messToUser .= "<td>".$option['price'] * $data['period']." руб.</td>";
                              }
                              $messToUser .= "</tr>";
                        }
                      }
        }
        $messToUser .= "</table>";
    }
    $messToUser .= "Комментарий: ".$data['comment']."<br />";
    $messToUser .= "Если остались вопросы, звоните по номеру телефона +7 (978) 999-97-977"."<br />";
    $messToUser .= "— С уважением, Администрация sochirentacar.ru"."<br />";


    $messToAdmin =  "Пользователь ".$data['name']."<br />";
    $messToAdmin .= "Забронировал автомобиль ".$data['car'].", цвет - ".$data['color']."<br />";
    if ($data['features'] != ''){
        $messToAdmin .= $data['features']."<br />";
    }
    $messToAdmin .= "Номер телефона арендатора ".$data['phone']."<br />";
    $messToAdmin .= "Email Арендатора: ".$data['email']."<br />";
    $messToAdmin .= "Сумма предоплаты: ".$data['sum']."руб."."<br />";
    $messToAdmin .= "Стоимость дня: ".$data['day_sum']."руб."."<br />";
    $messToAdmin .= "Стоимость за период: ".$data['period_sum']."руб."."<br />";
    $messToAdmin .= "Стоимость опций: ".$data['option_sum']."руб."."<br />";
    $messToAdmin .= "Стоимость c учетом опций: ".$data['total_sum']."руб."."<br />";
    $messToAdmin .= "Дата брони: с: ".$data['df']." по ". $data['dt']."<br />";
    $messToAdmin .= "Период: ".$data['period']." дней<br />";
    $messToAdmin .= "Место подачи: ".$data['place']."<br />";
    if ($opt > 0){
        $messToAdmin .= "Дополнительные опции:<br />";
        $messToAdmin .= "<table>";
        foreach ($data['options'] as $option){
          if (isset($option['value'])){
            if($option['value']){
                  $messToAdmin .= "<tr>";
                  $messToAdmin .= "<td>".$option['name']."</td>";
                  if ($option['type'] === 'full'){
                      $messToAdmin .= "<td>".$option['price']." руб.</td>";
                  }else{
                      $messToAdmin .= "<td>".$option['price'] * $data['period']." руб.</td>";
                  }
                  $messToAdmin .= "</tr>";
            }
          }
        }
        $messToAdmin .= "</table>";
    }
    $messToAdmin .= "Комментарий: ".$data['comment']."<br />";

    // Set From: header
    $from = "Sochirentacar <rent@sochirentacar.ru>";
//    $from = "cat@9h0st.ru";

    // Email Headers
    $headers1 = "From: " . $from . "\r\n";
    $headers1 .= "Reply-To: rent@sochirentacar.ru\r\n";
    $headers1 .= "MIME-Version: 1.0\r\n";
    $headers1 .= "Content-Type: text/html; charset=UTF-8\r\n";


    $headers2 = "From: " . $from . "\r\n";
    $headers2 .= "Reply-To: rent@sochirentacar.ru\r\n";
    $headers2 .= "MIME-Version: 1.0\r\n";
    $headers2 .= "Content-Type: text/html; charset=UTF-8\r\n";


    ini_set("sendmail_from", $data['email']); // for windows server
    $mail = mail($data['email'], 'Ваша заявка принята.', $messToUser, $headers2);
    $mail2 = mail($from, 'Новая заявка принята c сайта sochirentacar.ru.', $messToAdmin, $headers1);
    $data = array('status'=>'success');
    echo 'success';

}

?>
