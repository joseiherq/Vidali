<?php
class CORE_GROUP extends CORE_MAIN{

	public function __construct (){
		parent::__construct();
	}

	public function get_group($_name){
		$connection = parent::connect();
		$query = "SELECT id, nick, b.avatar_id, date_published,text
						  FROM vdl_publish a
						  JOIN vdl_user b ON b.id = id_user
						  JOIN vdl_group ON vdl_group.group_name = id_group
						  JOIN vdl_msg ON vdl_msg.id_msg = a.id_msg
						  WHERE vdl_msg.text  LIKE  '%".$_name."%'
						  LIMIT 0 , 30";
		//~ $query = "SELECT * FROM vdl_msg WHERE vdl_updates.upd_msg LIKE '%".$_name."%'";
		$data=mysql_query($query,$connection);
		$arresult=array();
		while ($row = mysql_fetch_array($data)) {
			array_push($arresult,$row);
		}
		return $arresult;
	}
}

?>