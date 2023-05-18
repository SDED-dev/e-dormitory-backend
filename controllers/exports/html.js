module.exports = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="header">
        <h2>НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ БІОРЕСУРСІВ І <br>
            ПРИРОДОКОРИСТУВАННЯ УКРАЇНИ</h2>
        <h1>НАКАЗ</h1>
    </div>
    <!--  -->
    <div class="header_date">
        <span>
            “_______”______________201_р.
        </span>
        <span>Київ</span>
        <span>
            №________
        </span>
    </div>
    <!--  -->
    <div>
        <p>
            <span style="margin-left: 25px;">Для</span> забезпечення організованого та своєчасного поселення до
            гуртожитків
            студентського містечка НУБіП України відповідно до наказу № __ від «__»
            ______ 20__ року «Про розподіл місць у студентських гуртожитках у
            ________н.р.» та враховуючи рішення розширеного засідання ради Студентської
            організації та Первинної профспілкової організації студентів та аспірантів
            НУБіП України (протокол №__ від «__» ______ 20__ року)
        </p>
    </div>
    <!--  -->
    <div class="content">
        <h2>НАКАЗУЮ</h2>
        <span> <span style="margin-left: 25px;">1.</span> Поселити студентів(а) _________________ факультету
            (ННІ):</span>
        <table>
            <thead>
                <tr style="height: 250px;">
                    <th>№ <br>
                        п/п</th>
                    <th>Прізвище</th>
                    <th>Ім'я</th>
                    <th>По батькові</th>
                    <th style="position: relative; width: 40px;"><span
                            style="position: absolute; transform: rotate(270deg); left: 0;">Курс</span></th>
                    <th style="position: relative; width: 40px;"><span
                            style="position: absolute; transform: rotate(270deg); left: 0;">Група</span></th>
                    <th style="position: relative; width: 40px;"><span
                            style="position: absolute; transform: rotate(270deg); left: 0; right: 0; bottom: 65.2px; white-space: nowrap;">Номер
                            гуртожитку</span></th>
                    <th style="position: relative; width: 40px;"><span
                            style="position: absolute; transform: rotate(270deg); left: 0; right: 0; bottom: 65.2px; white-space: nowrap;">Номер
                            кімнати</span></th>
                    <th style="position: relative; width: 40px;"><span
                            style="position: absolute; transform: rotate(270deg); left: 0; right: 0; bottom: 65.2px; white-space: nowrap;">Дата
                            поселення</span></th>
                    <th style="position: relative; width: 40px;;"><span
                            style="position: absolute; transform: rotate(270deg); left: 0; right: 0; bottom: 65.2px; white-space: nowrap;">Дата
                            виселення</span></th>
                </tr>
            </thead>
            <tbody>
                <tr style="font-weight: bold;">
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                </tr>
                key-table_edit
            </tbody>
        </table>
        <!--  -->
         <p>
            <span style="margin-left: 25px;">2.</span> Поселення проводити з дотриманням Положення про студентський
            гуртожиток НУБіП України, Правил внутрішнього розпорядку у студентських
            гуртожитках НУБіП України та інших нормативно-правових актів.
           <br> <span style="margin-left: 25px;">3.</span> Відповідальність за поселення покласти на декана ________факультету
            (директора _______ННІ) та завідувача гуртожитку № _____.
           <br> <span style="margin-left: 25px;">4.</span> Контроль за виконанням наказу покласти на директора студентського
            містечка НУБіП України С. Стецюка.
        </p>
    </div>
</body>

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        line-height: 27.5px;
    }

    .header {
        text-align: center;
        /* margin-top: 70px; */

    }

    .header h2 {
        font-size: 18px;
    }

    .header h1 {
        font-size: 28px;
    }

    .header_date {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    th,
    td {
        border: 1px solid black;
        text-align: center;
    }

    .content h2 {
        text-align: center;
        font-size: 16px;
    }
</style>

</html>
`;
