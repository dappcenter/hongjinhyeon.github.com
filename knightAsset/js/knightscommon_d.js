
var attack1;
var attack2;
var attack3;

var prop_unique1 = 0.0001283109616;
var prop_unique2 = 0.00006415548081;
var prop_legendary = 0.000008019435101;
var prop_acient = 0.0000005012146938;

var eosknights_avgFloor = 0.0;

function calculate_max_floors(VerType) 
{
    var max_sec;
    var totalmaxsec;
    var current_kill_count;
    var attack;
    var defense;
    var health;
    var total_kill_count = 0;
    var effectiveRibirthTime = 0;

    var killcount1;
    var killcount2;
    var killcount3;

    var cbChangeStatAfterCalulation = document.getElementById("changeStatAfterCalulate").checked;
 
    //knight
    attack = getCalculatedValue(document.getElementById("Part1_Attack1").value);
    defense = getCalculatedValue(document.getElementById("Part1_Defense1").value);
    health = getCalculatedValue(document.getElementById("Part1_HP1").value);

    if(cbChangeStatAfterCalulation)
    {
        document.getElementById("Part1_Attack1").value = attack;
        document.getElementById("Part1_Defense1").value = defense;
        document.getElementById("Part1_HP1").value = health;
    }

    max_sec = calculate_max_alive_time(defense, health);
    rebirth1Sec = max_sec;
    attack1 = attack;

    effectiveRibirthTime = max_sec;
    totalmaxsec = max_sec;

    current_kill_count = getTotalKillCount(attack, max_sec);
    total_kill_count += current_kill_count;
    killcount1 = current_kill_count;

    document.getElementById("Part1_SurvivalMiniute1").value = parseInt(max_sec / 60);
    document.getElementById("Part1_KillCount1").value = addComma(current_kill_count);
    document.getElementById("Part1_DPS1").value = (attack1 / 60 ).toFixed(2); //calculate_DamageBlock

    //Archer
    attack = getCalculatedValue(document.getElementById("Part1_Attack2").value);
    defense = getCalculatedValue(document.getElementById("Part1_Defense2").value);
    health = getCalculatedValue(document.getElementById("Part1_HP2").value);

    if(cbChangeStatAfterCalulation)
    {
        document.getElementById("Part1_Attack2").value = attack;
        document.getElementById("Part1_Defense2").value = defense;
        document.getElementById("Part1_HP2").value = health;
    }

    max_sec = calculate_max_alive_time(defense, health);
    rebirth2Sec = max_sec;
    attack2 = attack;

    if (max_sec < effectiveRibirthTime) {
        effectiveRibirthTime = max_sec;
    }

    if (max_sec > totalmaxsec) {
        totalmaxsec = max_sec;
    }
 
    current_kill_count = getTotalKillCount(attack, max_sec);
    total_kill_count += current_kill_count;
    killcount2 = current_kill_count;

    document.getElementById("Part1_SurvivalMiniute2").value = parseInt(max_sec / 60);
    document.getElementById("Part1_KillCount2").value = addComma(current_kill_count);
    document.getElementById("Part1_DPS2").value = (attack2 / 60 ).toFixed(2); //calculate_DamageBlock

    //Mage
    attack = getCalculatedValue(document.getElementById("Part1_Attack3").value);
    defense = getCalculatedValue(document.getElementById("Part1_Defense3").value);
    health = getCalculatedValue(document.getElementById("Part1_HP3").value);
    attack3 = attack;

    if(cbChangeStatAfterCalulation)
    {
        document.getElementById("Part1_Attack3").value = attack;
        document.getElementById("Part1_Defense3").value = defense;
        document.getElementById("Part1_HP3").value = health;
    }

    max_sec = calculate_max_alive_time(defense, health);
    rebirth3Sec = max_sec;
    current_kill_count = getTotalKillCount(attack, max_sec);
    total_kill_count += current_kill_count;
    killcount3 = current_kill_count;

    if (max_sec < effectiveRibirthTime) {
        effectiveRibirthTime = max_sec;
    }

    if (max_sec > totalmaxsec) {
        totalmaxsec = max_sec;
    }


    document.getElementById("Part1_SurvivalMiniute3").value = parseInt(max_sec / 60);
    document.getElementById("Part1_KillCount3").value = addComma(current_kill_count);
    document.getElementById("Part1_DPS3").value = (attack3 / 60 ).toFixed(2);


    var maxFloor = (parseInt(total_kill_count / 10) + 1);
    document.getElementById("Part1_Total Floors").value = maxFloor + " castles  |  " + (total_kill_count % 10) + "/10";


    want_knightRebirthTime = effectiveRibirthTime;
    totalmaxsec = parseInt(totalmaxsec / 60);
    //document.getElementById("Part1_EffectiveRebirthTimeTitle").innerText = "Effective RebirthTime";

    if (totalmaxsec > 60) {
        document.getElementById("Part1_EffectiveRebirthTime").value =  parseInt(totalmaxsec / 60) + " hours : " + pad(parseInt(totalmaxsec % 60),2) + " minutes";
    }
    else {
        document.getElementById("Part1_EffectiveRebirthTime").value =  pad(totalmaxsec,2) + " minutes";
    }
 

    //SetDropRateAndMagicWater(killcount1,killcount2,killcount3,cbChangeStatAfterCalulation,maxFloor);
    
    if(VerType == "OLD")
    {
        SetDropRateAndMagicWater(killcount1,killcount2,killcount3,cbChangeStatAfterCalulation,maxFloor);
        
    }
    else
    {
        SetDropRateAndMagicWater_GDR(killcount1,killcount2,killcount3,cbChangeStatAfterCalulation,maxFloor);
        
    }
    
    setTargetFloorData(maxFloor,VerType);
 
}

function SetDropRateAndMagicWater(killcount1,killcount2,killcount3,cbChangeStatAfterCalulation,maxFloor)
{
    //Drop Rate
    //calculate material drop rate

    var kv_floor_bonus_1000 = 20.0;
    var floor_drop_bonus = kv_floor_bonus_1000 * (maxFloor / 1000.0);
    var drop_rate;
    var dropMaterialCount1;

    var luck_knight;
    var luck_Archer;
    var luck_Mage;

    //1.knight
    luck_knight = getCalculatedValue(document.getElementById("Part1_Luck1").value);

    if(cbChangeStatAfterCalulation)
    {
        document.getElementById("Part1_Luck1").value = luck_knight; 
    }

    drop_rate = get_drop_rate_with_luck(luck_knight);
    drop_rate += floor_drop_bonus;


    if (drop_rate > 100.0) { drop_rate = 100.0; }
    document.getElementById("Part1_DropRate1").value = drop_rate.toFixed(2) + " %";

    dropMaterialCount1 = (Number(killcount1) * drop_rate / 100);
    document.getElementById("Part1_Material1").value  = addComma(parseInt(dropMaterialCount1));

    document.getElementById("Part1_DropUnique1_1").value  = prop(prop_unique1,dropMaterialCount1) + " %";
    document.getElementById("Part1_DropUnique2_1").value  = prop(prop_unique2,dropMaterialCount1) + " %";
    document.getElementById("Part1_DropLegendary1").value  = prop(prop_legendary,dropMaterialCount1) + " %";
    document.getElementById("Part1_DropAncient1").value  = prop(prop_acient,dropMaterialCount1) + " %";

    //2.Archer
    luck_Archer = getCalculatedValue(document.getElementById("Part1_Luck2").value);

    if(cbChangeStatAfterCalulation)
    {
        document.getElementById("Part1_Luck2").value = luck_Archer; 
    }

    drop_rate = get_drop_rate_with_luck(luck_Archer);
    drop_rate += floor_drop_bonus;

    if (drop_rate > 100.0) { drop_rate = 100.0; }
    document.getElementById("Part1_DropRate2").value = drop_rate.toFixed(2) + " %";

    dropMaterialCount1 = (Number(killcount2) * drop_rate / 100);
    document.getElementById("Part1_Material2").value  =  addComma(parseInt(dropMaterialCount1));

    document.getElementById("Part1_DropUnique1_2").value  = prop(prop_unique1,dropMaterialCount1) + " %";
    document.getElementById("Part1_DropUnique2_2").value  = prop(prop_unique2,dropMaterialCount1) + " %";
    document.getElementById("Part1_DropLegendary2").value  = prop(prop_legendary,dropMaterialCount1) + " %";
    document.getElementById("Part1_DropAncient2").value  = prop(prop_acient,dropMaterialCount1) + " %";


    //3.Mage
    luck_Mage = getCalculatedValue(document.getElementById("Part1_Luck3").value);

    if(cbChangeStatAfterCalulation)
    {
        document.getElementById("Part1_Luck3").value = luck_Mage; 
    }

    drop_rate = get_drop_rate_with_luck(luck_Mage);
    drop_rate += floor_drop_bonus;

    if (drop_rate > 100.0) { drop_rate = 100.0; }
    document.getElementById("Part1_DropRate3").value = drop_rate.toFixed(2) + " %";

    dropMaterialCount1 = (Number(killcount3) * drop_rate / 100);
    document.getElementById("Part1_Material3").value  =  addComma(parseInt(dropMaterialCount1));

    document.getElementById("Part1_DropUnique1_3").value  = prop(prop_unique1,dropMaterialCount1) + " %";
    document.getElementById("Part1_DropUnique2_3").value  = prop(prop_unique2,dropMaterialCount1) + " %";
    document.getElementById("Part1_DropLegendary3").value  = prop(prop_legendary,dropMaterialCount1) + " %";
    document.getElementById("Part1_DropAncient3").value  = prop(prop_acient,dropMaterialCount1) + " %";
    
    //[Magic Water]
    var mw_killcount;
    var mw_now;
    var mw_total = 0;

    mw_killcount = killcount1;
    mw_now = get_MagicWater(mw_killcount, luck_knight, maxFloor);
    document.getElementById("Part1_MW1").value = mw_now;
    mw_total = mw_now;

    mw_killcount = killcount2;
    mw_now = get_MagicWater(mw_killcount, luck_Archer, maxFloor);
    document.getElementById("Part1_MW2").value = mw_now;
    mw_total = parseFloat(mw_total) + parseFloat(mw_now);

    mw_killcount =killcount3;
    mw_now = get_MagicWater(mw_killcount, luck_Mage, maxFloor);
    document.getElementById("Part1_MW3").value = mw_now;
    mw_total = parseFloat(mw_total) + parseFloat(mw_now);

    document.getElementById("Part1_TotalMW").value = mw_total.toFixed(2) + " Magic Waters";
}

function SetDropRateAndMagicWater_GDR(killcount1,killcount2,killcount3,cbChangeStatAfterCalulation,maxFloor)
{
    //가변드랍률

    load_AvgFloors();

    //eosknights_avgFloor 평균층수
    var gdr = get_global_drop_factor(eosknights_avgFloor);

    var kv_floor_bonus_1000 = 20.0;
    var floor_drop_bonus = kv_floor_bonus_1000 * (maxFloor / 1000.0);
    var drop_rate;
    var dropMaterialCount1;

    var luck_knight;
    var luck_Archer;
    var luck_Mage;

    //1.knight
    luck_knight = getCalculatedValue(document.getElementById("Part1_Luck1").value);

    if(cbChangeStatAfterCalulation)
    {
        document.getElementById("Part1_Luck1").value = luck_knight; 
    }

    drop_rate = get_drop_rate_with_luck(luck_knight);
    drop_rate += floor_drop_bonus;


    if (drop_rate > 100.0) { drop_rate = 100.0; }
    document.getElementById("Part1_DropRate1").value = drop_rate.toFixed(2) + " %";

    dropMaterialCount1 = (Number(killcount1) * drop_rate / 100);
    document.getElementById("Part1_Material1").value  = addComma(parseInt(dropMaterialCount1));

    document.getElementById("Part1_DropUnique1_1").value  = prop_GDR(prop_unique1,dropMaterialCount1,drop_rate,gdr) + " %";
    document.getElementById("Part1_DropUnique2_1").value  = prop_GDR(prop_unique2,dropMaterialCount1,drop_rate,gdr) + " %";
    document.getElementById("Part1_DropLegendary1").value  = prop_GDR(prop_legendary,dropMaterialCount1,drop_rate,gdr) + " %";
    document.getElementById("Part1_DropAncient1").value  = prop_GDR(prop_acient,dropMaterialCount1,drop_rate,gdr) + " %";

    //2.Archer
    luck_Archer = getCalculatedValue(document.getElementById("Part1_Luck2").value);

    if(cbChangeStatAfterCalulation)
    {
        document.getElementById("Part1_Luck2").value = luck_Archer; 
    }

    drop_rate = get_drop_rate_with_luck(luck_Archer);
    drop_rate += floor_drop_bonus;

    if (drop_rate > 100.0) { drop_rate = 100.0; }
    document.getElementById("Part1_DropRate2").value = drop_rate.toFixed(2) + " %";

    dropMaterialCount1 = (Number(killcount2) * drop_rate / 100);
    document.getElementById("Part1_Material2").value  =  addComma(parseInt(dropMaterialCount1));

    document.getElementById("Part1_DropUnique1_2").value  = prop_GDR(prop_unique1,dropMaterialCount1,drop_rate,gdr) + " %";
    document.getElementById("Part1_DropUnique2_2").value  = prop_GDR(prop_unique2,dropMaterialCount1,drop_rate,gdr) + " %";
    document.getElementById("Part1_DropLegendary2").value  = prop_GDR(prop_legendary,dropMaterialCount1,drop_rate,gdr) + " %";
    document.getElementById("Part1_DropAncient2").value  = prop_GDR(prop_acient,dropMaterialCount1,drop_rate,gdr) + " %";


    //3.Mage
    luck_Mage = getCalculatedValue(document.getElementById("Part1_Luck3").value);

    if(cbChangeStatAfterCalulation)
    {
        document.getElementById("Part1_Luck3").value = luck_Mage; 
    }

    drop_rate = get_drop_rate_with_luck(luck_Mage);
    drop_rate += floor_drop_bonus;

    if (drop_rate > 100.0) { drop_rate = 100.0; }
    document.getElementById("Part1_DropRate3").value = drop_rate.toFixed(2) + " %";

    dropMaterialCount1 = (Number(killcount3) * drop_rate / 100);
    document.getElementById("Part1_Material3").value  =  addComma(parseInt(dropMaterialCount1));

    document.getElementById("Part1_DropUnique1_3").value  = prop_GDR(prop_unique1,dropMaterialCount1,drop_rate,gdr) + " %";
    document.getElementById("Part1_DropUnique2_3").value  = prop_GDR(prop_unique2,dropMaterialCount1,drop_rate,gdr) + " %";
    document.getElementById("Part1_DropLegendary3").value  = prop_GDR(prop_legendary,dropMaterialCount1,drop_rate,gdr) + " %";
    document.getElementById("Part1_DropAncient3").value  = prop_GDR(prop_acient,dropMaterialCount1,drop_rate,gdr) + " %";
    
    //[Magic Water]
    var mw_killcount;
    var mw_now;
    var mw_total = 0;

    mw_killcount = killcount1;
    mw_now = get_MagicWater_GDR(mw_killcount, luck_knight, maxFloor,eosknights_avgFloor,gdr);
    document.getElementById("Part1_MW1").value = mw_now;
    mw_total = mw_now;

    mw_killcount = killcount2;
    mw_now = get_MagicWater_GDR(mw_killcount, luck_Archer, maxFloor,eosknights_avgFloor,gdr);
    document.getElementById("Part1_MW2").value = mw_now;
    mw_total = parseFloat(mw_total) + parseFloat(mw_now);

    mw_killcount =killcount3;
    mw_now = get_MagicWater_GDR(mw_killcount, luck_Mage, maxFloor,eosknights_avgFloor,gdr);
    document.getElementById("Part1_MW3").value = mw_now;
    mw_total = parseFloat(mw_total) + parseFloat(mw_now);

    document.getElementById("Part1_TotalMW").value = mw_total.toFixed(2) + " Tiger Runes";
}


function get_bonus_floor_bonus(floor, avg_floor) 
{
     var base_floor = avg_floor * 5;
     var res_new = Math.min(parseInt(base_floor), floor) / (parseFloat(base_floor) * 0.5);
     return parseFloat(res_new);     
}

function get_global_drop_factor(avg_floor) 
{
    var rular = 1000.0;
    var length = parseFloat(avg_floor) / rular;
    
    if (length < 1.0) {
        length = 1.0;
    }

    var drop_rate = 1.0 / Math.pow(2.0, parseFloat(length) - 1.0);

    return parseFloat(drop_rate);
}
 
function setTargetFloorData(nowMaxFloor,VerType)
{
    //입력된 것이 도달할 수 있는 MaxFloor보다 높으면 처리 안한다.
    var rebirthKnightCountTarget = document.getElementById("Part1_targetFloorsForDropRateAndMW").value;
    
    if(rebirthKnightCountTarget == "")
    {
        return;
    }

    if(rebirthKnightCountTarget >= nowMaxFloor)
    {
        return;
    }
 

    setOrderKnightDataByMaxLiveSec();

    var arryMaxLiveSecEachKnights = getEachMaxLiveSecTargetFloor(rebirthKnightCountTarget);
 
    var attack;
    var current_kill_count;
    var max_sec;
    var killcount1,killcount2,killcount3;

    //1.knights
    attack  = attackList[knight1Index];
    max_sec = arryMaxLiveSecEachKnights[knight1Index];
    current_kill_count = getTotalKillCount(attack, max_sec);
    killcount1 = current_kill_count;
    document.getElementById("Part1_SurvivalMiniute1").value = parseInt(max_sec / 60);
    document.getElementById("Part1_KillCount1").value = addComma(current_kill_count);

    //2.Archer
    attack  = attackList[knight2Index];
    max_sec = arryMaxLiveSecEachKnights[knight2Index];
    current_kill_count = getTotalKillCount(attack, max_sec);
    killcount2 = current_kill_count;
    document.getElementById("Part1_SurvivalMiniute2").value = parseInt(max_sec / 60);
    document.getElementById("Part1_KillCount2").value = addComma(current_kill_count);

    //3.Mage
    attack  = attackList[knight3Index];
    max_sec = arryMaxLiveSecEachKnights[knight3Index];
    current_kill_count = getTotalKillCount(attack, max_sec);
    killcount3 = current_kill_count;
    document.getElementById("Part1_SurvivalMiniute3").value = parseInt(max_sec / 60);
    document.getElementById("Part1_KillCount3").value = addComma(current_kill_count);

    //max-floor
    document.getElementById("Part1_Total Floors").value = rebirthKnightCountTarget + " Floors ( Max:" + nowMaxFloor + ")";

    //time...
    var effectiveRibirthTime = parseInt(arryMaxLiveSecEachKnights[0] / 60);

    //document.getElementById("Part1_EffectiveRebirthTimeTitle").innerText = "Elapsed Time";

    if (effectiveRibirthTime > 60) {
        document.getElementById("Part1_EffectiveRebirthTime").value =  parseInt(effectiveRibirthTime / 60) + " hours : " + pad(parseInt(effectiveRibirthTime % 60),2) + " minutes";
    }
    else {
        document.getElementById("Part1_EffectiveRebirthTime").value =  pad(effectiveRibirthTime,2) + " minutes";
    }

    if(VerType == "OLD")
    {
        SetDropRateAndMagicWater(killcount1,killcount2,killcount3,false,rebirthKnightCountTarget);
    }
    else
    {
        SetDropRateAndMagicWater_GDR(killcount1,killcount2,killcount3,false,rebirthKnightCountTarget);
    }
   
}
 
var knight1Index,knights2Index,knights3Index;

function setOrderKnightDataByMaxLiveSec()
{
     
    if(rebirth1Sec >= rebirth2Sec)
    {

        if(rebirth1Sec >= rebirth3Sec)
        {
            maxliveSecList[0] = rebirth1Sec;
            attackList[0] = attack1;
            knight1Index = 0;

            if(rebirth3Sec >= rebirth2Sec)
            {
                maxliveSecList[1] = rebirth3Sec;
                maxliveSecList[2] = rebirth2Sec;
                                
                attackList[1] = attack3;
                attackList[2] = attack2;

                knight3Index = 1;
                knight2Index = 2;
            }
            else
            {
                maxliveSecList[1] = rebirth2Sec;
                maxliveSecList[2] = rebirth3Sec;

                attackList[1] = attack2;
                attackList[2] = attack3;

                knight3Index = 2;
                knight2Index = 1;
            }
        }
        else
        {
            maxliveSecList[0] = rebirth3Sec;
            maxliveSecList[1] = rebirth1Sec;
            maxliveSecList[2] = rebirth2Sec;

            attackList[0] = attack3;
            attackList[1] = attack1;
            attackList[2] = attack2;
            
            knight3Index = 0;
            knight1Index = 1;
            knight2Index = 2;

        }
    }
    else
    {
        if(rebirth2Sec >= rebirth3Sec)
        {
            maxliveSecList[0] = rebirth2Sec;
            attackList[0] = attack2;
            knight2Index = 0;

            if(rebirth3Sec >= rebirth1Sec)
            {
                maxliveSecList[1] = rebirth3Sec;
                maxliveSecList[2] = rebirth1Sec;

                attackList[1] = attack3;
                attackList[2] = attack1;
                
                knight3Index = 1;
                knight1Index = 2;
                
            }
            else
            {
                maxliveSecList[1] = rebirth1Sec;
                maxliveSecList[2] = rebirth3Sec;

                attackList[1] = attack1;
                attackList[2] = attack3;

                knight1Index = 1;
                knight3Index = 2;
                
            }
        }
        else
        {
           maxliveSecList[0] = rebirth3Sec;
           maxliveSecList[1] = rebirth2Sec;
           maxliveSecList[2] = rebirth1Sec;

           attackList[0] = attack3;
           attackList[1] = attack2;
           attackList[2] = attack1;

           knight3Index = 0;
           knight2Index = 1;
           knight1Index = 2;

        }
    }
 
}

//For TargetFloor's DropRate And Waters..
function getEachMaxLiveSecTargetFloor(_targetFloor)
{
    var targetFloorMaxLiveSecOfEachKnights = new Array();

    var targetKillCount = _targetFloor * 10;
    var returnRebirthSec;
    //0 max, 1 middle , 2 min
 
    var temp_attack_sum = Number(attackList[0]) + Number(attackList[1]) + Number(attackList[2]);

    var temp_kill_count = parseInt(temp_attack_sum * maxliveSecList[2] / 60 / 200);
    var kill_count_sum = temp_kill_count;

    if (temp_kill_count >= targetKillCount)
    {
        //3rd knight survival time meet the target floors
        returnRebirthSec = parseInt((targetKillCount * 60 * 200) / temp_attack_sum);
        targetFloorMaxLiveSecOfEachKnights[0] = returnRebirthSec;
        targetFloorMaxLiveSecOfEachKnights[1] = returnRebirthSec;
        targetFloorMaxLiveSecOfEachKnights[2] = returnRebirthSec;
    }
    else
    {
        targetFloorMaxLiveSecOfEachKnights[2] =  maxliveSecList[2] ;

        temp_attack_sum = Number(attackList[0]) + Number(attackList[1]);
        temp_kill_count = parseInt(temp_attack_sum * (maxliveSecList[1] - maxliveSecList[2]) / 60 / 200);

        if ((kill_count_sum + temp_kill_count) >= targetKillCount)
        {
            //2nd kinght survial time meet the target floors
            var secondKillSec = parseInt(((targetKillCount - kill_count_sum) * 60 * 200) / temp_attack_sum);
            returnRebirthSec = maxliveSecList[2] + secondKillSec;

            targetFloorMaxLiveSecOfEachKnights[0] = returnRebirthSec;
            targetFloorMaxLiveSecOfEachKnights[1] = returnRebirthSec;
        }
        else
        {
            targetFloorMaxLiveSecOfEachKnights[1] = maxliveSecList[1];

            kill_count_sum += temp_kill_count;
            temp_attack_sum = Number(attackList[0]);
            temp_kill_count = parseInt(temp_attack_sum * (maxliveSecList[0] - maxliveSecList[1]) / 60 / 200);

            if ((kill_count_sum + temp_kill_count) >= targetKillCount)
            {
                //1st kinight servial time meet the target floors
                var thirdKillSec = parseInt(((targetKillCount - kill_count_sum) * 60 * 200) / temp_attack_sum);
                returnRebirthSec = maxliveSecList[1] + thirdKillSec;
                targetFloorMaxLiveSecOfEachKnights[0] = returnRebirthSec;
            }
            else
            {
                //else return max survial time
                targetFloorMaxLiveSecOfEachKnights[0] =  maxliveSecList[0];
            }
        }

    }
    
    return targetFloorMaxLiveSecOfEachKnights;
        
}


function clearResultFields()
{
    document.getElementById("Part1_SurvivalMiniute1").value = "";
    document.getElementById("Part1_SurvivalMiniute2").value = "";
    document.getElementById("Part1_SurvivalMiniute3").value = "";

    document.getElementById("Part1_KillCount1").value = "";
    document.getElementById("Part1_KillCount2").value = "";
    document.getElementById("Part1_KillCount3").value = "";

    document.getElementById("Part1_DropRate1").value = "";
    document.getElementById("Part1_DropRate2").value = "";
    document.getElementById("Part1_DropRate3").value = "";

    document.getElementById("Part1_Material1").value = "";
    document.getElementById("Part1_Material2").value = "";
    document.getElementById("Part1_Material3").value = "";

    document.getElementById("Part1_MW1").value = "";
    document.getElementById("Part1_MW2").value = "";
    document.getElementById("Part1_MW3").value = "";
    
    document.getElementById("Part1_DropUnique1_1").value  = "";
    document.getElementById("Part1_DropUnique2_1").value   = "";
    document.getElementById("Part1_DropLegendary1").value   = "";
    document.getElementById("Part1_DropAncient1").value   = "";

    document.getElementById("Part1_DropUnique1_2").value  = "";
    document.getElementById("Part1_DropUnique2_2").value   = "";
    document.getElementById("Part1_DropLegendary2").value   = "";
    document.getElementById("Part1_DropAncient2").value   = "";

    document.getElementById("Part1_DropUnique1_3").value  = "";
    document.getElementById("Part1_DropUnique2_3").value   = "";
    document.getElementById("Part1_DropLegendary3").value   = "";
    document.getElementById("Part1_DropAncient3").value   = "";

    document.getElementById("Part1_Total Floors").value   = "";
    document.getElementById("Part1_TotalMW").value   = "";
    document.getElementById("Part1_EffectiveRebirthTime").value   = "";

    document.getElementById("Part1_targetFloorsForDropRateAndMW").value   = "";

}

function prop(_p,_c)
{
    return parseFloat( (1 - Math.pow((1-_p),_c)) * 100).toFixed(6);
}

function prop_GDR(_p,_c,drop_rate,gdr)
{
    _p = _p * (drop_rate / 100.0) * gdr;
    return parseFloat( (1 - Math.pow((1-_p),_c)) * 100).toFixed(6);
}


function pad(n, width) 
{
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function getCalculatedValue(originInput)
{
    if(originInput == "")
    {
        return "";
    }

    var parseData;
    var sumvalue = 0;

    if(originInput.includes("+"))
    {
        parseData = originInput.split('+');

        for ( var i in parseData ) 
        {
          sumvalue += Number(parseData[i]) ;
        }

    }
    else if(originInput.includes("-"))
    {
        parseData = originInput.split('-');

        for ( var i in parseData ) 
        {
            if(i==0)
            {
                sumvalue = Number(parseData[i]);
            }
            else
            {
                sumvalue -=  Number(parseData[i]) ;
            }
          
        }
    }
    else
    {
        return originInput;
    }

    return sumvalue;
    
}

function get_MagicWater(kill_count, luck, maxFloor) {
    var powder = 0;
    var kv_kill_powder_rate = 50;

    var current_powder = parseInt(kill_count) / parseInt(kv_kill_powder_rate);
    var scaler = 1.0 + (parseInt(luck) / 1000.0);
    if (scaler > 8) {
        scaler = 8;
    }
 
    current_powder = current_powder * scaler;

    current_powder = parseFloat(current_powder * (1.0 + (Math.min(1000, maxFloor) / 500.0)));

    if (current_powder <= 0) {
        current_powder = 1;
    }

    return current_powder.toFixed(2);
}

function get_MagicWater_GDR(kill_count, luck, maxFloor,avg_floor, gdr) {

    var kv_kill_powder_rate = 50;

    var current_powder = parseFloat(kill_count) / parseFloat(kv_kill_powder_rate);
    var scaler = 1.0 + (parseInt(luck) / 1000.0);
    if (scaler > 8) {
        scaler = 8;
    }
 
    current_powder = current_powder * scaler;

    current_powder = parseFloat(current_powder * (1.0 + get_bonus_floor_bonus(maxFloor, avg_floor)  * parseFloat(gdr) ) );
    
    if (current_powder <= 0) {
        current_powder = 1;
    }

    return current_powder.toFixed(2);
}


function get_drop_rate_with_luck(luck) {

    var stage_drop_rate = parseInt(document.getElementById("Part1_StageDropBonus").value);
    var nowLuck = parseInt(luck);

    var addition = stage_drop_rate * (nowLuck / parseInt(nowLuck + parseInt("777")));

    return parseInt(stage_drop_rate + addition);

}


function calculate_max_alive_time(_defence, _health) {
    var damage_per_min = 25;
    var knightdefence = Number(_defence);
    damage_per_min -= parseFloat(25) * knightdefence / (knightdefence + Number("1000"));
    var alive_sec = parseInt(60 * _health / damage_per_min);

    return alive_sec;
}

function calculate_DamageBlock(_defence) {
    var damage_per_min = 25;
    var damage_per_min_Now;
    var knightdefence = Number(_defence);
    damage_per_min_Now = damage_per_min - (parseFloat(25) * knightdefence / (knightdefence + Number("1000")));
    var dep = (((damage_per_min / damage_per_min_Now)-1) * 100).toFixed(2);

    return dep;
}

function getTotalKillCount(_attack, max_sec) {
    var current_kill_count = parseInt(_attack * max_sec / 60 / 200);
    if (current_kill_count == 0) {
        current_kill_count = 1;
    }

    return current_kill_count;
}


function getOriginStat(itemlevel, nowStat) {
    var percent = 1.0;

    switch (itemlevel) {
        case "1":
            percent = 1;
            break;
        case "2":
            percent = 1.2;
            break;
        case "3":
            percent = 1.4;
            break;
        case "4":
            percent = 1.8;
            break;
        case "5":
            percent = 2.6;
            break;
        case "6":
            percent = 3.4;
            break;
        default:
            break;
    }

    return parseInt((parseFloat(nowStat) / parseFloat(percent)));

}

function calculate_max_ItemLevel() {


    document.getElementById("Part2_Stat1Result").value = "";
    document.getElementById("Part2_Stat2Result").value = "";
    document.getElementById("Part2_Stat3Result").value = "";
 
    var percent = 1.0;

    switch (document.getElementById("Part2_TargetItemLevel").value) {
        case "2":
            percent = 1.2;
            break;
        case "3":
            percent = 1.4;
            break;
        case "4":
            percent = 1.8;
            break;
        case "5":
            percent = 2.6;
            break;
        case "6":
            percent = 3.4;
            break;
        default:
            break;
    }

    var max_stat;

    if (document.getElementById("Part2_Stat1").value != "") {

        var origin1stat = getOriginStat(document.getElementById("Part2_NowItemLevel").value, document.getElementById("Part2_Stat1").value);
        max_stat = parseInt(parseInt(origin1stat) * percent);
        document.getElementById("Part2_Stat1Result").value = max_stat + " (+" + (max_stat - document.getElementById("Part2_Stat1").value) + ")";
    }
    if (document.getElementById("Part2_Stat2").value != "") {

        var origin2stat = getOriginStat(document.getElementById("Part2_NowItemLevel").value, document.getElementById("Part2_Stat2").value);
        max_stat = parseInt(parseInt(origin2stat) * percent);
        document.getElementById("Part2_Stat2Result").value = max_stat + " (+" + (max_stat - document.getElementById("Part2_Stat2").value) + ")";
    }
    if (document.getElementById("Part2_Stat3").value != "") {

        var origin3stat = getOriginStat(document.getElementById("Part2_NowItemLevel").value, document.getElementById("Part2_Stat3").value);
        max_stat = parseInt(parseInt(origin3stat) * percent);
        document.getElementById("Part2_Stat3Result").value = max_stat + " (+" + (max_stat - document.getElementById("Part2_Stat3").value) + ")";
    }


}

function calculate_origin_ItemLevel() {


    document.getElementById("Part3_Stat1Result").value = "";
    document.getElementById("Part3_Stat2Result").value = "";
    document.getElementById("Part3_Stat3Result").value = "";

    var percent = 1.0;

    switch (document.getElementById("Part3_NowItemLevel").value) {
        case "2":
            percent = 1.2;
            break;
        case "3":
            percent = 1.4;
            break;
        case "4":
            percent = 1.8;
            break;
        case "5":
            percent = 2.6;
            break;
        case "6":
            percent = 3.4;
            break;
        default:
            break;
    }

    if (document.getElementById("Part3_Stat1").value != "") {
        document.getElementById("Part3_Stat1Result").value = Math.ceil(parseFloat(document.getElementById("Part3_Stat1").value) / percent);
    }

    if (document.getElementById("Part3_Stat2").value != "") {
        document.getElementById("Part3_Stat2Result").value = Math.ceil(parseFloat(document.getElementById("Part3_Stat2").value) / percent);
    }

    if (document.getElementById("Part3_Stat3").value != "") {
        document.getElementById("Part3_Stat3Result").value = Math.ceil(parseFloat(document.getElementById("Part3_Stat3").value) / percent);
    }
}

function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }

function setCookie(name, value) {
    var date = new Date();
    date.setTime(date.getTime() + 1000 * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

function getCookie(name) {

    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}

function save_now_stats() {
    setCookie("K1", document.getElementById("Part1_Attack1").value);
    setCookie("A1", document.getElementById("Part1_Attack2").value);
    setCookie("M1", document.getElementById("Part1_Attack3").value);
    setCookie("K2", document.getElementById("Part1_Defense1").value);
    setCookie("A2", document.getElementById("Part1_Defense2").value);
    setCookie("M2", document.getElementById("Part1_Defense3").value);
    setCookie("K3", document.getElementById("Part1_HP1").value);
    setCookie("A3", document.getElementById("Part1_HP2").value);
    setCookie("M3", document.getElementById("Part1_HP3").value);
    setCookie("K4", document.getElementById("Part1_Luck1").value);
    setCookie("A4", document.getElementById("Part1_Luck2").value);
    setCookie("M4", document.getElementById("Part1_Luck3").value);
    alert("save complete!");
}

function load_saved_stats() {
    document.getElementById("Part1_Attack1").value = getCookie("K1");
    document.getElementById("Part1_Attack2").value = getCookie("A1");
    document.getElementById("Part1_Attack3").value = getCookie("M1");

    document.getElementById("Part1_Defense1").value = getCookie("K2");
    document.getElementById("Part1_Defense2").value = getCookie("A2");
    document.getElementById("Part1_Defense3").value = getCookie("M2");

    document.getElementById("Part1_HP1").value = getCookie("K3");
    document.getElementById("Part1_HP2").value = getCookie("A3");
    document.getElementById("Part1_HP3").value = getCookie("M3");

    document.getElementById("Part1_Luck1").value = getCookie("K4");
    document.getElementById("Part1_Luck2").value = getCookie("A4");
    document.getElementById("Part1_Luck3").value = getCookie("M4");
    alert("load complete!!");
}

function load_playerStatAndRevenue(lang)
{
    load_playerStat();
    load_playerRevenue(lang);
    load_playerMaxFoorAndNowPowder(lang);
    clearResultFields();
    load_AvgFloors(lang);
    load_playerDivRevenue(lang);
}
 
function load_playerStat()
{
    
    var EOSAccountName = document.getElementById("EOSAccountName").value

    if (EOSAccountName == "") return;

    var data = JSON.stringify({"json":true,"code":"eossanguoone","scope":"eossanguoone","table":"hero","key_type":"name","lower_bound":EOSAccountName,"index_position":1,"limit":1});
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {

        var resultObj = JSON.parse(this.responseText);

        var type = resultObj.rows[0].rows[0].type;
        var attack = resultObj.rows[0].rows[0].attack;
        var defense = resultObj.rows[0].rows[0].defense;
        var hp = resultObj.rows[0].rows[0].hp;
        var luck = resultObj.rows[0].rows[0].luck;

        setStat(type, attack, defense, hp, luck);

        type = resultObj.rows[0].rows[1].type;
        attack = resultObj.rows[0].rows[1].attack;
        defense = resultObj.rows[0].rows[1].defense;
        hp = resultObj.rows[0].rows[1].hp;
        luck = resultObj.rows[0].rows[1].luck;

        setStat(type, attack, defense, hp, luck);

        type = resultObj.rows[0].rows[2].type;
        attack = resultObj.rows[0].rows[2].attack;
        defense = resultObj.rows[0].rows[2].defense;
        hp = resultObj.rows[0].rows[2].hp;
        luck = resultObj.rows[0].rows[2].luck;

        setStat(type, attack, defense, hp, luck);
    }
    });

    xhr.open("POST", "https://eos.greymass.com/v1/chain/get_table_rows");
    xhr.send(data);
}


function setStat(type, attack, def, hp, luck)
{
    if (type == "1")
    {

        document.getElementById("Part1_Attack1").value = attack;
        document.getElementById("Part1_Defense1").value = def;
        document.getElementById("Part1_HP1").value = hp;
        document.getElementById("Part1_Luck1").value = luck;
    }
    else if (type == "2")
    {
        document.getElementById("Part1_Attack2").value = attack;
        document.getElementById("Part1_Defense2").value = def;
        document.getElementById("Part1_HP2").value = hp;
        document.getElementById("Part1_Luck2").value = luck;
    }
    else
    {
        document.getElementById("Part1_Attack3").value = attack;
        document.getElementById("Part1_Defense3").value = def;
        document.getElementById("Part1_HP3").value = hp;
        document.getElementById("Part1_Luck3").value = luck;
    }

}


function load_playerRevenue(lang)
{
    
    var EOSAccountName = document.getElementById("EOSAccountName").value

    if (EOSAccountName == "") return;
   
    var data = JSON.stringify({"json":true,"code":"eossanguoone","scope":"eossanguoone","table":"revenue","key_type":"name","lower_bound":EOSAccountName,"index_position":1,"limit":1});

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {

        var resultObj = JSON.parse(this.responseText);
        //minus -3% tax
        var profit = parseFloat(resultObj.rows[0].selling.replace("EOS","")) - (parseFloat(resultObj.rows[0].selling.replace("EOS","")) * 0.03) - parseFloat( resultObj.rows[0].spending.replace("EOS","")) - parseFloat( resultObj.rows[0].buying.replace("EOS",""));

        if (lang == "ko")
        {
            document.getElementById("revenue").innerHTML = " <a href='" + "https://eosflare.io/account/"+ EOSAccountName + "' target='_blank'>총 수익 : " + profit.toFixed(4) + " EOS ( 판매:" + resultObj.rows[0].selling + " 5% 세금 포함,지출:" + (parseFloat(resultObj.rows[0].spending.replace("EOS", "")) + parseFloat(resultObj.rows[0].buying.replace("EOS", ""))).toFixed(4) + " EOS ) </a>";
        }
        else
        {
            document.getElementById("revenue").innerHTML = " <a href='" + "https://eosflare.io/account/"+ EOSAccountName + "' target='_blank'>Your profit : " + profit.toFixed(4) + " EOS ( Selling:" + resultObj.rows[0].selling + " including 5% tax,Spending:" + (parseFloat(resultObj.rows[0].spending.replace("EOS", "")) + parseFloat(resultObj.rows[0].buying.replace("EOS", ""))).toFixed(4) + " EOS ) </a>";
        }
        

        if (profit < 0) 
        {
            document.getElementById("revenue").style.color = "blue";
        }
        else
        {
            document.getElementById("revenue").style.color = "red";
        }

    }
    });

    xhr.open("POST", "https://eos.greymass.com/v1/chain/get_table_rows");
    xhr.send(data);
}

function load_playerMaxFoorAndNowPowder(lang)
{
    
    var EOSAccountName = document.getElementById("EOSAccountName").value

    if (EOSAccountName == "") return;
   
    var data = JSON.stringify({"json":true,"code":"eossanguoone","scope":"eossanguoone","table":"player","key_type":"name","lower_bound":EOSAccountName,"index_position":1,"limit":1});

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {

        var resultObj = JSON.parse(this.responseText);
        knightsLastRebirthTime = resultObj.rows[0].last_rebirth;

        if (lang == "ko")
        {
            document.getElementById("nowmaxfloorandpowder").innerHTML = "나의 최대 도달 층수 : <font color='red'>" + addComma(resultObj.rows[0].maxfloor) + "</font>    소유한 매직워터 <font color='red'>" + addComma(resultObj.rows[0].powder) +"</font>";
        }
        else
        {
            document.getElementById("nowmaxfloorandpowder").innerHTML = " Your now max Castles : <font color='red'>" + addComma(resultObj.rows[0].maxfloor) + "</font> and have <font color='red'>" + addComma(resultObj.rows[0].powder) +"</font> Tiger Runes";
        }

        
        
    }
    });

    xhr.open("POST", "https://eos.greymass.com/v1/chain/get_table_rows");
    xhr.send(data);
}

function load_AvgFloors(lang)
{
     
    var data = JSON.stringify({"json":true,"code":"eossanguoone","scope":"eossanguoone","table":"globaldr","key_type":"name","lower_bound":"","index_position":1,"limit":1});

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {

        var resultObj = JSON.parse(this.responseText);
        eosknights_avgFloor = resultObj.rows[0].floor_sum / resultObj.rows[0].floor_submit_count;
      
        if (lang == "ko")
        {
            document.getElementById("nowTotalAvgFloor").innerHTML = "전체 유저 평균 : <font color='red'>" + addComma( parseInt(eosknights_avgFloor) ) + "</font> (현재 시스템 드랍률 <font color='blue'>  ▼ " + (100 - (get_global_drop_factor(eosknights_avgFloor) * 100)).toFixed(4) + " %</font>)";
        }
        else
        {
            //document.getElementById("nowTotalAvgFloor").innerHTML = "Average Floors : <font color='red'>" + addComma( parseInt(eosknights_avgFloor) ) + "</font> (Now Drop Rate is <font color='blue'>  ▼ " + (100 - (get_global_drop_factor(eosknights_avgFloor) * 100)).toFixed(4) + " %</font>)";
            document.getElementById("nowTotalAvgFloor").innerHTML = "Average Castles : <font color='red'>" + addComma( parseInt(eosknights_avgFloor) ) + "</font>";
        }

        
    }
    });

    xhr.open("POST", "https://eos.greymass.com/v1/chain/get_table_rows");
    xhr.send(data);

}

function load_playerDivRevenue(lang)
{
    
    var EOSAccountName = document.getElementById("EOSAccountName").value

    if (EOSAccountName == "") return;
   
    var data = JSON.stringify({"json":true,"code":"eossanguoone","scope":"eossanguoone","table":"revenue2","key_type":"name","lower_bound":EOSAccountName,"index_position":1,"limit":1});

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {

        var resultObj = JSON.parse(this.responseText);
        var div_eos = resultObj.rows[0].div_eos;
        var div_tkt = resultObj.rows[0].div_tkt;

        if (lang == "ko")
        {
            document.getElementById("revenuediv").innerHTML = " Your Reward : <font color='red'>" +div_eos + "</font> and <font color='red'>" + div_tkt +"</font>";
        }
        else
        {
            document.getElementById("revenuediv").innerHTML = " Your Reward : <font color='red'>" +div_eos + "</font> and <font color='red'>" + div_tkt +"</font>";
        }

        
        
    }
    });

    xhr.open("POST", "https://eos.greymass.com/v1/chain/get_table_rows");
    xhr.send(data);
}

function enter_check(lang)
{
    if(event.keyCode == 13){
        load_playerStatAndRevenue(lang);
   }
}

function startRebirthAlarm_func()
{
    if(knightsLastRebirthTime == "" || want_knightRebirthTime == "")
    {
        alert("First load account info and press the calculate button");
        return;
    }

    var rebirthKnightCountTarget = document.getElementById("rebirthKnightCount");
    var selectedRebirthType = rebirthKnightCountTarget.options[rebirthKnightCountTarget.selectedIndex].value; 

    if(selectedRebirthType=="4")
    {
        var rebirthKnightCountTarget = document.getElementById("rebirthTargetFloor").value;

        if(rebirthKnightCountTarget == "")
        {
            alert("First set the Target Castles");
            return;
        }
        
    }

    document.getElementById("startRebirthAlarm").className = "disabled";
    document.getElementById("stopRebirthAlarm").classList.remove("disabled");
    document.getElementById("stopRebirthAlarm").className = "primary";

    setWantRebirthSec();
    displayNextRebirthTime();
    startRebirthAlert();

    //initial start 1
    load_playerMaxFoorAndNowPowder();
    rebirthAlarmCheck();

}

function rebirthKnightsTypeChanged()
{
    var rebirthKnightCountTarget = document.getElementById("rebirthKnightCount");
    var selectedRebirthType = rebirthKnightCountTarget.options[rebirthKnightCountTarget.selectedIndex].value; 

    if(selectedRebirthType=="4")
    {
        document.getElementById("rebirthTargetFloor").style.visibility ="visible";
    }
    else
    {
        document.getElementById("rebirthTargetFloor").style.visibility ="hidden";
    }

}


function stopRebirthAlarm_func()
{
    stopAlert();
    document.getElementById("startRebirthAlarm").classList.remove("disabled");
    document.getElementById("stopRebirthAlarm").className = "disabled";
    //stopAlert(); */
    snd.pause();
    snd.currentTime = 0;
}

var knightsLastRebirthTime = "";
var rebirth1Sec;
var rebirth2Sec;
var rebirth3Sec;
var want_knightRebirthTime = ""; 
var snd = new Audio('knightAsset/audio/alarm01.mp3');
var alarmplaycount = 0;

//snd.addEventListener('ended', function ()
//{
    //only loop one more (twice )
    //playtime is 21sec

    /* if(alarmplaycount != 1)
    {
        alarmplaycount = 1;
        this.currentTime=0;
        this.play();
    } */

//    this.currentTime=0;
//    this.play();
 

//},false);

function startRebirthAlert()
{
    /* var rebirthCheckInterval = document.getElementById("alarmCheckIntervalMin").value;

    if(rebirthCheckInterval == "")
    {
        alert("set the alarm check interval");
        return;
    } */

   /*  if(isNaN(rebirthCheckInterval)==true)
    {
        rebirthCheckInterval = 1;
    }
 */
    setWantRebirthSec();
 
    playAlert = setInterval(function() 
    {
        //1.get last_rebirthTime from api
        load_playerMaxFoorAndNowPowder();
        rebirthAlarmCheck();

    }, 1 * 60000);

};

var maxliveSecList = new Array();
var attackList = new Array();

function setWantRebirthSec()
{
    var rebirthKnightCountTarget = document.getElementById("rebirthKnightCount");
    var selectedRebirthType = rebirthKnightCountTarget.options[rebirthKnightCountTarget.selectedIndex].value; 
    //0 max
    //1 meduim
    //2 min

    //

    if(rebirth1Sec >= rebirth2Sec)
    {
        if(rebirth1Sec >= rebirth3Sec)
        {
            maxliveSecList[0] = rebirth1Sec;
            attackList[0] = attack1;

            if(rebirth3Sec >= rebirth2Sec)
            {
                maxliveSecList[1] = rebirth3Sec;
                maxliveSecList[2] = rebirth2Sec;

                attackList[1] = attack3;
                attackList[2] = attack2;
            }
            else
            {
                maxliveSecList[1] = rebirth2Sec;
                maxliveSecList[2] = rebirth3Sec;

                attackList[1] = attack2;
                attackList[2] = attack3;
            }
        }
        else
        {
            maxliveSecList[0] = rebirth3Sec;
            maxliveSecList[1] = rebirth1Sec;
            maxliveSecList[2] = rebirth2Sec;

            attackList[0] = attack3;
            attackList[1] = attack1;
            attackList[2] = attack2;

        }
    }
    else
    {
        if(rebirth2Sec >= rebirth3Sec)
        {
            maxliveSecList[0] = rebirth2Sec;
            attackList[0] = attack2;

            if(rebirth3Sec >= rebirth1Sec)
            {
                maxliveSecList[1] = rebirth3Sec;
                maxliveSecList[2] = rebirth1Sec;

                attackList[1] = attack3;
                attackList[2] = attack1;

            }
            else
            {
                maxliveSecList[1] = rebirth1Sec;
                maxliveSecList[2] = rebirth3Sec;

                attackList[1] = attack1;
                attackList[2] = attack3;
            }
        }
        else
        {
           maxliveSecList[0] = rebirth3Sec;
           maxliveSecList[1] = rebirth2Sec;
           maxliveSecList[2] = rebirth1Sec;

           attackList[0] = attack3;
           attackList[1] = attack2;
           attackList[2] = attack1;

        }
    }

    if(selectedRebirthType =="4")
    {
        //seleted floor
        var rebirthKnightCountTarget = document.getElementById("rebirthTargetFloor").value;
        getSecTargetFloor(rebirthKnightCountTarget);
    }
    else
    {
        if(selectedRebirthType=="1")
        {
            want_knightRebirthTime = maxliveSecList[2];
        }
        else if(selectedRebirthType=="2")
        {
            //medium
            want_knightRebirthTime = maxliveSecList[1];
        }
        else
        {
            //max value
            want_knightRebirthTime = maxliveSecList[0];
        }
    }
    
     
}
  
function stopAlert()
{
     clearInterval(playAlert);
};

function getSecTargetFloor(_targetFloor)
{
    var targetKillCount = _targetFloor * 10;
    var returnRebirthSec;
    //0 max, 1 middle , 2 min
 
    var temp_attack_sum = Number(attackList[0]) + Number(attackList[1]) + Number(attackList[2]);

    var temp_kill_count = parseInt(temp_attack_sum * maxliveSecList[2] / 60 / 200);
    var kill_count_sum = temp_kill_count;

    if (temp_kill_count >= targetKillCount)
    {
        //3rd knight survival time meet the target floors
        returnRebirthSec = parseInt((targetKillCount * 60 * 200) / temp_attack_sum);
    }
    else
    {
        temp_attack_sum = Number(attackList[0]) + Number(attackList[1]);
        temp_kill_count = parseInt(temp_attack_sum * (maxliveSecList[1] - maxliveSecList[2]) / 60 / 200);

        if ((kill_count_sum + temp_kill_count) >= targetKillCount)
        {
            //2nd kinght survial time meet the target floors
            var secondKillSec = parseInt(((targetKillCount - kill_count_sum) * 60 * 200) / temp_attack_sum);
            returnRebirthSec = maxliveSecList[2] + secondKillSec;
        }
        else
        {
            kill_count_sum += temp_kill_count;
            temp_attack_sum = Number(attackList[0]);
            temp_kill_count = parseInt(temp_attack_sum * (maxliveSecList[0] - maxliveSecList[1]) / 60 / 200);

            if ((kill_count_sum + temp_kill_count) >= targetKillCount)
            {
                //1st kinight servial time meet the target floors
                var thirdKillSec = parseInt(((targetKillCount - kill_count_sum) * 60 * 200) / temp_attack_sum);
                returnRebirthSec = maxliveSecList[1] + thirdKillSec;
            }
            else
            {
                //else return max survial time
                returnRebirthSec = maxliveSecList[0];
            }
        }

    }
    
    want_knightRebirthTime = returnRebirthSec;
     
}


function rebirthAlarmCheck()
{
    var nowTimeStamp =  ( Math.floor(Date.now() / 1000) );

    displayNextRebirthTime();

    if( (knightsLastRebirthTime + want_knightRebirthTime + 1500000000) <= nowTimeStamp)
    {
        snd.play();
    }

}

function pauseAlarmSound()
{
    alarmplaycount = 0;
    snd.pause();
    this.currentTime=0;
}

function displayNextRebirthTime()
{
    var date = knightsLastRebirthTime + want_knightRebirthTime + 1500000000;
    var lastrbd = knightsLastRebirthTime + 1500000000;
    var t = new Date('1970-01-01');
    t.setSeconds(t.getSeconds() + lastrbd);

    document.getElementById("lastRebirthTime").innerHTML = "Last Rebirth Time : " + t.getFullYear() + "-" + pad((t.getMonth()+1),2) +"-"+  pad(t.getDate(),2) + " " + pad(t.getHours(),2) + ":" + pad(t.getMinutes(),2) + ":" + pad(t.getSeconds(),2);
    
    var leftsecond = date - ( Math.floor(Date.now() /1000));
    var leftmin;

    if(leftsecond > 0)
    {
        leftmin = parseInt(leftsecond / 60);
    }
    else
    {
        leftmin = 0;
    }
    
    t = new Date('1970-01-01');
    t.setSeconds(t.getSeconds() + date);

    var displaylefthoursAndmin;

    if (leftmin > 60) {
        displaylefthoursAndmin =  parseInt(leftmin / 60) + " hours : " + pad(parseInt(leftmin % 60),2) + " minutes";
    }
    else {
        displaylefthoursAndmin =  pad(leftmin,2) + " minutes";
    }


    document.getElementById("nextRebirthTime").innerHTML = "Next Rebirth Time : " + t.getFullYear() + "-" + pad((t.getMonth()+1),2) +"-"+  pad(t.getDate(),2) + " " + pad(t.getHours(),2) + ":" + pad(t.getMinutes(),2) + ":" + pad(t.getSeconds(),2) + " ( " + displaylefthoursAndmin +" left )" ;

}