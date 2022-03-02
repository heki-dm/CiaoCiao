var flgg = 99;
// プレイヤー
class Player {
    // インスタンス生成時→名前設定
    constructor(number) {
        this.pnum = number;
        this.place = 0;
        this.life = 7;
        this.point = 0;
        this.goals = 0;
        this.flg = true; //true:☠ではない   false:☠がでた
    }
    setName(number) {
        // 名前入力
        // デフォルト値：Player + num
        let pn = prompt("Player" + number + "\nプレイヤー名を入力", "Player" + number);
        if (pn == null) {
            pn = "Player" + number;
        }
        $("#player" + number).html(pn); //名前表示
        $("#player" + number + "_life").html(this.life);
        $("#player" + number + "_point").html(this.point);
        $("#player" + number + "_goal").html(this.goals);
        rule.do(); //ルール表示

        //test
        for (i = 1; i <= 4; i++) {
            flgg = 99;
            move.do(i, 0);
        }
        flgg = 0;
        //
    }
}

// サイコロ
class Dice {
    // サイコロ振る 表示
    set() {
        $("#choice").prepend('<input type="button" value="サイコロを振る" id="roll" class="button">');
    }

    // サイコロ振る
    pip(turn) {
        let pips = ["1", "2", "3", "4", "☠", "☠"]; //サイコロの目一覧
        let num = Number(Math.floor(Math.random() * 6)); //配列添字生成
        if (num == 4 || num == 5) {
            num = parseInt(prompt("\n☠が出ました!\n値を1~4で申告してください"));
            switch (turn) {
                case 1:
                    p1.flg = false;
                    break;
                case 2:
                    p2.flg = false;
                    break;
                case 3:
                    p3.flg = false;
                    break;
                case 4:
                    p4.flg = false;
                    break;
            }
            if (!(num >= 1 && num <= 4) || num == "") {
                alert("1~4の数値ではありませんでした(# ﾟДﾟ)\n1が入力されます。");
                num = 1;
            }
        } else {
            alert(pips[num] + " が出ました");
            num++;
        }
        alert("他のプレイヤーに出た目を言ってください。");
        $("#roll").remove();
        return num;
    }

    // スルー・ダマシ選択
    choice(turn, dturn) {
        if (turn == dturn) {
            $("#player" + turn + "_status").append("――");
            gm.dturn = add.do(dturn, 0);
            this.choice(turn, gm.dturn);
        } else {
            let pn = $("#player" + dturn).html();
            alert(pn + " スルーかダマシを選択してください");
            $("#choice").prepend('<input type="button" value="ダマシ" id="doubt" class="button">');
            $("#choice").prepend('<input type="button" value="スルー" id="through" class="button">');
        }
    }
}

const rule = {
    do: function () {
        alert("■----ルール----■\n" +
            "<<他のプレイヤーが操作しているところを見てはいけません!!!>>\n" +
            "1.サイコロを振り、出た目を言う\n" +
            "2.1~4の目が出た場合は、そのまま出た数字を申告、一方☠(ドクロ)が出た場合は、必ず嘘をついて1~4までの数字を申告\n" +
            "3.他のプレイヤーは嘘をついていると思ったら「ダマシ」ボタンを、嘘をついていないと思ったら「スルー」ボタンを押す\n" +
            "4.嘘を見破ることができた場合は嘘を見破ったプレーヤーのコマを失格とし、嘘の申告をしていた数字分コマを進めることができるが、嘘をついていなかった場合は、自分のコマを失う。\n" +
            "5.プレーヤーのコマがゴールするごとにポイントは高くなり、自分のコマが3つゴールするか、全員のコマが無くなった場合は得点の高い人の勝利となる。\n" +
            "6.残機がなくなると失格となる(ただし、スルーとダマシの選択はできる)\n" +
            "ルールはルールボタンからいつでも見ることができます\n" +
            "ヒントも参考にしてください"
        );
    },
    hint: function () {
        alert("・騙しあいのゲームです\n" +
            "<自分がゴールしそうなとき>\n" +
            "・相手が嘘をついていると思ってダウトを押して失敗するとせっかくゴール前まで来たのが水の泡になってしまいます\n" +
            "<相手がゴールしそうなとき>\n" +
            "・ダウトを押さないと相手がゴールしてしまいます。しかし、相手が嘘をついていないと残機が減ってしまいます\n");
    }
}

const move = {
    go: 0,
    do: function (player, pip) {
        // コマ動かす
        if (flgg == 0) {
            if (pip == 0) {
                // 振り出し
                pip = 0;
                switch (player) {
                    case 1:
                        p1.life--;
                        if (p1.life < 0) {
                            p1.life = 0;
                        }
                        $("#player1_life").html(p1.life);
                        p1.place = 0;
                        break;
                    case 2:
                        p2.life--;
                        if (p2.life < 0) {
                            p2.life = 0;
                        }
                        $("#player2_life").html(p2.life);
                        p2.place = 0;
                        break;
                    case 3:
                        p3.life--;
                        if (p3.life < 0) {
                            p3.life = 0;
                        }
                        $("#player3_life").html(p3.life);
                        p3.place = 0;
                        break;
                    case 4:
                        p4.life--;
                        if (p4.life < 0) {
                            p4.life = 0;
                        }
                        $("#player4_life").html(p4.life);
                        p4.place = 0;
                        break;
                }
            }
        }
        switch (player) {
            case 1:
                p1.place += pip;
                this.go = p1.place;
                break;
            case 2:
                p2.place += pip;
                this.go = p2.place;
                break;
            case 3:
                p3.place += pip;
                this.go = p3.place;
                break;
            case 4:
                p4.place += pip;
                this.go = p4.place;
                break;
        }
        $("#player" + player + "_icon").remove();
        $("#" + this.go).prepend('<img src="./images/player' + player + '.png" alt="" id="player' + player + '_icon" class="trout_player" style="position: relative;">');
    },
    doubt: function (turn, dturn, pip, flg) {
        let pn = $("#player" + dturn).html();
        if (flg == false) {
            alert(pn + " ダマシ成功○");
            move.do(turn, 0);
            switch (dturn) {
                case 1:
                    goal.do(p1.place, 1);
                    if (p1.life > 0) {
                        move.do(dturn, pip);
                    }
                    break;
                case 2:
                    goal.do(p2.place, 2);
                    if (p2.life > 0) {
                        move.do(dturn, pip);
                    }
                    break;
                case 3:
                    goal.do(p3.place, 3);
                    if (p3.life > 0) {
                        move.do(dturn, pip);
                    }
                    break;
                case 4:
                    goal.do(p4.place, 4);
                    if (p4.life > 0) {
                        move.do(dturn, pip);
                    }
                    break;
            }
        } else {
            alert(pn + " ダマシ失敗×");
            move.do(dturn, 0);
            move.do(turn, pip);
            switch (turn) {
                case 1:
                    goal.do(p1.place, 1);
                    break;
                case 2:
                    goal.do(p2.place, 2);
                    break;
                case 3:
                    goal.do(p3.place, 3);
                    break;
                case 4:
                    goal.do(p4.place, 4);
                    break;
            }
        }
        switch (turn) {
            case 1:
                p1.flg = true;
                break;
            case 2:
                p2.flg = true;
                break;
            case 3:
                p3.flg = true;
                break;
            case 4:
                p4.flg = true;
                break;
        }
    }
}

const goal = {
    point: 0,
    do: function (place, player) {
        // ゴールした場合
        if (place >= 10) {
            move.do(player, 0); //スタート位置ヘ移動
            // 点数表示
            this.point += 1;
            switch (player) {
                case 1:
                    p1.point += this.point;
                    p1.goals++;
                    $("#player1_point").html(p1.point);
                    $("#player1_goal").html(p1.goals);
                    break;
                case 2:
                    p2.point += this.point;
                    p2.goals++;
                    $("#player2_point").html(p2.point);
                    $("#player2_goal").html(p2.goals);
                    break;
                case 3:
                    p3.point += this.point;
                    p3.goals++;
                    $("#player3_point").html(p3.point);
                    $("#player3_goal").html(p3.goals);
                    break;
                case 4:
                    p4.point += this.point;
                    p4.goals++;
                    $("#player4_point").html(p4.point);
                    $("#player4_goal").html(p4.goals);
                    break;
            }
            let pn = $("#player" + player).html();
            alert(pn + " get " + this.point + "Point!!!");

        }
    },
    gudge: function () {
        if ((p1.goals == 3 || p2.goals == 3 || p3.goals == 3 || p4.goals == 3) || (p1.life == 0 && p2.life == 0 && p3.life == 0 && p4.life == 0)) {
            $("#roll").remove();
            $("#choice").prepend('<a href=./index.html><input type="button" value="はじめから"></a>');
            return 1;
        } else {
            return 0;
        }
    }
}

// ターン計算
const add = {
    do: function (turn, f) {
        if (turn == 4) {
            turn = 0;
        }
        turn++;
        let goalflag = goal.gudge();
        if (f == 1 && goalflag == 0) {
            while (true) {
                if ($("#player" + turn + "_life").html() == 0) {
                    turn++;
                    if (turn == 5) {
                        turn = 1;
                    }
                } else {
                    break;
                }
            }
        }
        return turn;
    },
    turn: function (turn) {
        let next = this.do(turn, 1);
        let pn = $("#player" + next).html();
        $("#turn").html(pn + 'のターンです');
        alert(pn + "の番です\nサイコロを振ってください");
        for (let i = 1; i <= 4; i++) {
            $("#player" + i + "_status").text("");
        }
        return next;
    }
}

const gm = {
    turn: 1,
    dturn: 1,
    action: 0,
    flag: true,
}

let p1 = new Player(1);
let p2 = new Player(2);
let p3 = new Player(3);
let p4 = new Player(4);
let dice = new Dice();


$(function () {

    p1.setName(1);
    p2.setName(2);
    p3.setName(3);
    p4.setName(4);

    dice.set();

    let pn = $("#player1").html();
    $("#turn").html(pn + 'のターンです');
    alert(pn + "の番です\nサイコロを振ってください");

    // ルール表示
    $("#rule").click(function () {
        rule.do();
    });

    // ヒント表示
    $("#hint").click(function () {
        rule.hint();
    });

    // サイコロを振る
    $("#choice").on("click", "#roll", function () {
        gm.action = dice.pip(gm.turn);
        dice.choice(gm.turn, gm.dturn);
    });

    // スルー
    $("#choice").on("click", "#through", function () {
        $("#player" + gm.dturn + "_status").html("スルー");
        $("#choice #through").remove();
        $("#choice #doubt").remove();
        if ((gm.turn != 4 && gm.dturn == 4) || (gm.turn == 4 && gm.dturn == 3)) {
            // 全員スルーの場合
            switch (gm.turn) {
                case 1:
                    if (p1.life > 0) {
                        move.do(1, gm.action);
                        goal.do(p1.place, 1);
                    }

                    break;
                case 2:
                    if (p2.life > 0) {
                        move.do(2, gm.action);
                        goal.do(p2.place, 2);
                    }
                    break;
                case 3:
                    if (p3.life > 0) {
                        move.do(3, gm.action);
                        goal.do(p3.place, 3);
                    }
                    break;
                case 4:
                    if (p4.life > 0) {
                        move.do(4, gm.action);
                        goal.do(p4.place, 4);
                    }
                    break;
            }
            gm.turn = add.turn(gm.turn);
            gm.dturn = 1;
            dice.set();
        } else {
            gm.dturn = add.do(gm.dturn);
            dice.choice(gm.turn, gm.dturn);
        }
    });

    // ダマシ
    $("#choice").on("click", "#doubt", function () {
        $("#player" + gm.dturn + "_status").html("ダマシ");
        $("#choice #through").remove();
        $("#choice #doubt").remove();
        switch (gm.turn) {
            case 1:
                gm.flag = p1.flg;
                break;
            case 2:
                gm.flag = p2.flg;
                break;
            case 3:
                gm.flag = p3.flg;
                break;
            case 4:
                gm.flag = p4.flg;
                break;
        }
        move.doubt(gm.turn, gm.dturn, gm.action, gm.flag);
        gm.turn = add.turn(gm.turn);
        gm.dturn = 1;
        dice.set();
    });
});