
/*-------------------------------------------*/
// 基本処理
/*-------------------------------------------*/
// htmlパーツ
/*-------------------------------------------*/
// row の基本処理
/*-------------------------------------------*/
// row 追加ボタンが押された時の処理
/*-------------------------------------------*/
// row 削除ボタンが押された時の処理
/*-------------------------------------------*/
// カラム
	/*-------------------------------------------*/
	// カラムにマウスオーバーしたら
		/*-------------------------------------------*/
		// Edit ボタンが押された時の動作
			/*-------------------------------------------*/
			// 編集反映ボタンをクリック
			/*-------------------------------------------*/
			// キャンセルボタンをクリック
	/*-------------------------------------------*/
	// カラムからマウスアウトしたら
/*-------------------------------------------*/
// カラムサイズ変更ボタンが押された時の処理
/*-------------------------------------------*/
// カラム追加ボタンが押された時の処理
		/*-------------------------------------------*/
		// 今ある全部のカラムサイズを取得する
		/*-------------------------------------------*/
		// カラム追加ボタンを押したカラムのサイズを取得する
		/*-------------------------------------------*/
		// 追加するカラムのサイズ計算
				/*-------------------------------------------*/
				// カラムを追加
/*-------------------------------------------*/
// 保存ボタン表示処理
		/*-------------------------------------------*/
		// 保存処理（php側に記載）
/*-------------------------------------------*/
// Row Wrap ボタン表示処理
/*-------------------------------------------*/
// Row Wrap ボタンが押された時の処理
/*-------------------------------------------*/

/*-------------------------------------------*/
// 基本処理
/*-------------------------------------------*/

function vkEdit_functions(){
	vkEdit_row_action();
	vkEdit_col_action();
	vkEdit_rowWrapBtn_display();
}

jQuery(document).ready(function($){
	vkEdit_functions();
});


/*-------------------------------------------*/
// htmlパーツ
/*-------------------------------------------*/

var class_columns	= '.col-sm-12,.col-sm-11,.col-sm-10,.col-sm-9,.col-sm-9,.col-sm-7,.col-sm-6,.col-sm-5,.col-sm-4,.col-sm-3,.col-sm-2,.col-sm-1,'

var btn_row_add_up 		= '<span class="vkEdit_btn vkEdit_btn_addRow vkEdit_btn_addRow_up"><i class="fa fa-caret-up"></i> Add Row</span>';
var btn_row_add_down 	= '<span class="vkEdit_btn vkEdit_btn_addRow vkEdit_btn_addRow_down"><i class="fa fa-caret-down"></i> Add Row</span>';
var btn_row_del 	= '<span class="vkEdit_btn vkEdit_btn_delRow"><i class="fa fa-times"></i> Del</span>';

// 行追加編集パネル
var html_rowEditPanel = '<div class="vkEdit_editPanel_row vkEdit_no_add_row">' + btn_row_add_up + btn_row_add_down + btn_row_del + '</div>';
var html_rowDefaultSet = '<div class="row"><div class="col-sm-12"><p>Input here.</p></div></div>';

/*-------------------------------------------*/
// row の基本処理
/*-------------------------------------------*/
function vkEdit_row_action(){
	jQuery('#vkEdit_editWrap .row').each(function(i){
		jQuery(this).mouseenter(function(){
			// ホバー状態でない時
			if (!jQuery(this).hasClass('vkEdit_row_hover')) {

				// ホバー識別クラス追加
				jQuery(this).addClass('vkEdit_row_hover');

				// 編集バー表示
				// 編集バーを前後に追加した後でアニメーション
				jQuery(this).prepend(html_rowEditPanel).children('.vkEdit_editPanel_row').each(function(){
					jQuery(this).animate({ 
						height: "22px",
						opacity: 1
					}, 300);
				});

				// rowを追加
				vkEdit_btn_addRow();
				// rowを削除
				vkEdit_btn_delRow();

			}
		}); // jQuery(this).mouseenter(function(){
		jQuery(this).mouseleave(function(){
			jQuery(this).removeClass('vkEdit_row_hover');
			jQuery(this).children('.vkEdit_editPanel_row').each(function(){
				// jQuery(this).fadeOut(300,function(){
				// 	jQuery(this).remove();
				// });
				jQuery(this).animate({ 
					height: '0',
					opacity: 0
				}, 300, function(){
					jQuery(this).remove();
				});
			});
		}); // jQuery(this).mouseleave(function(){
	});
}

/*-------------------------------------------*/
// row 追加ボタンが押された時の処理
/*-------------------------------------------*/
function vkEdit_btn_addRow(){
	jQuery('.vkEdit_btn_addRow_up').click(function(){
		jQuery(this).parent().parent().before(html_rowDefaultSet);
		vkEdit_row_action();
		vkEdit_col_action();
		vkEdit_display_masterPanel();
	});
	jQuery('.vkEdit_btn_addRow_down').click(function(){
		jQuery(this).parent().parent().after(html_rowDefaultSet);
		vkEdit_row_action();
		vkEdit_col_action();
		vkEdit_display_masterPanel();
	});
}
/*-------------------------------------------*/
// row 削除ボタンが押された時の処理
/*-------------------------------------------*/
function vkEdit_btn_delRow(){
	jQuery('.vkEdit_btn_delRow').click(function(){
		if (confirm("Are you sure?")) {
			jQuery(this).parent().parent().remove();
			vkEdit_display_masterPanel();
		}
	});
}


/*-------------------------------------------*/
// カラム
/*-------------------------------------------*/

var btn_col_edit 	= '<span class="vkEdit_btn vkEdit_btn_edit"><i class="fa fa-pencil"></i> Edit</span>';
var btn_col_add 	= '<span class="vkEdit_btn vkEdit_btn_addCol"><i class="fa fa-plus-square"></i> Add Col</span>';
var btn_col_del 	= '<span class="vkEdit_btn vkEdit_btn_delCol"><i class="fa fa-times"></i> Del</span>';
var btn_col_change 	= '<span class="vkEdit_btn vkEdit_btn_change"><i class="fa fa-check-square"></i> Change</span>';
var btn_col_chancel = '<span class="vkEdit_btn vkEdit_btn_cancel"><i class="fa fa-times"></i> Cancel</span>';
// カラムボタン
var btn_col_sm12	= '<span class="vkEdit_btn vkEdit_btn_colSize vkEdit_btn_sm12">1/1</span>';
var btn_col_sm9		= '<span class="vkEdit_btn vkEdit_btn_colSize vkEdit_btn_sm9">3/4</span>';
var btn_col_sm8		= '<span class="vkEdit_btn vkEdit_btn_colSize vkEdit_btn_sm8">2/3</span>';
var btn_col_sm6		= '<span class="vkEdit_btn vkEdit_btn_colSize vkEdit_btn_sm6">1/2</span>';
var btn_col_sm4		= '<span class="vkEdit_btn vkEdit_btn_colSize vkEdit_btn_sm4">1/3</span>';
var btn_col_sm3		= '<span class="vkEdit_btn vkEdit_btn_colSize vkEdit_btn_sm3">1/4</span>';

// カラムサイズボタンセット
var html_colEditPanel_btnSet_size = '<div class="vkEdit_btnSet_size vkEdit_no_add_row">'+ btn_col_sm12 + btn_col_sm9 + btn_col_sm8 + btn_col_sm6 + btn_col_sm4 + btn_col_sm3 +'</div>';
// カラムアクティブ編集ボタン（ [変更][ キャンセル ] + カラムサイズボタンセット）
var html_colEditPanel_btnSet_active = '<div class="vkEdit_btnSet vkEdit_btnSet_active hidden vkEdit_no_add_row">'+ btn_col_change + btn_col_chancel + '</div>';
// カラム非アクティブ編集ボタン
var html_colEditPanel_btnSet_hover = '<div class="vkEdit_btnSet vkEdit_btnSet_hover vkEdit_no_add_row">' + btn_col_edit + btn_col_add + btn_col_del + html_colEditPanel_btnSet_size + '</div>'

// カラム編集パネルのHTML
var html_colEditPanel = '<div class="vkEdit_editPanel_col vkEdit_no_add_row">'+ html_colEditPanel_btnSet_hover + html_colEditPanel_btnSet_active + '</div>';

// 対象のカラム識別用クラス
// var column_no = 'column_no_' + i;
// カラム識別用のクラスとhover識別用クラスを編集に入れる
var editting_class = 'vkEdit_column_hover';

function vkEdit_col_action(){
// function vkColInnerMouseAction(){
jQuery('#vkEdit_editWrap .row div').each(function(i){

	// カラムのクラスを全て取得
	var colClass_all = jQuery(this).attr('class');
	// クラス名に col- が含まれている場合
	if ( colClass_all.match(/col-/) ) {

		/*-------------------------------------------*/
		// カラムにマウスオーバーしたら
		/*-------------------------------------------*/
		jQuery(this).mouseenter(function(){
		// カラムが既にホバー状態じゃない時
		if (!jQuery(this).hasClass('vkEdit_column_hover')) {
			// カラムにホバー識別クラス追加
			jQuery(this).addClass(editting_class);
			// columnの中をhtml改変用のdivで囲う
			jQuery(this).wrapInner('<div class="vkEdit_column_inner">');
			// row内、Add hover panel
			jQuery(this).children('.vkEdit_column_inner').before( html_colEditPanel );
			// editパネルをアニメーションしながら表示
			jQuery(this).children('.vkEdit_column_inner').prev('.vkEdit_editPanel_col').animate({ 
				// height: "44px",
				opacity: 1
			}, 300);

			// カラム追加ボタンが押された時の処理
			vkEdit_btn_addCol();
			// カラム削除ボタンが押された時の処理
			vkEdit_btn_delCol();
			// カラムサイズ変更ボタンが押された時の処理
			vkEdit_btn_changeCol();

			/*-------------------------------------------*/
			// Edit ボタンが押された時の動作
			/*-------------------------------------------*/
			jQuery(this).find('.vkEdit_editPanel_col .vkEdit_btn_edit').click(function(){

				// 対象のカラム
				var select_targetCol = jQuery(this).parent().parent().parent();
				// カラムにアクティブクラスを追加
				select_targetCol.addClass('vkEdit_column_active');
				jQuery(this).parent().parent().css("height","inherit");

				// カラム内のHTMLを格納
				var html_before = select_targetCol.find('.vkEdit_column_inner').html();

				// 表示するボタンの切り替え

					// 非表示になっているアクティブ（編集）ボタンセットを表示
					jQuery('.vkEdit_btnSet_active.hidden').removeClass('hidden');
					// 表示しているホバーボタンセットを非表示に
					jQuery('.vkEdit_btnSet_hover').addClass('hidden');

				// テキストエリアの中に編集するhtmlを入れる（wrapInnerだとタグを入れられてる場合にうまく表示できない）
				select_targetCol.children('.vkEdit_column_inner').html('<textarea>' + html_before + '</textarea>');

				/*-------------------------------------------*/
				// 編集反映ボタンをクリック
				/*-------------------------------------------*/
				jQuery(this).parent().parent().find('.vkEdit_btn_change').click(function(){

					// 対象のカラム
					var select_targetCol = jQuery(this).parent().parent().parent();
					// カラムからアクティブクラスを削除
					select_targetCol.removeClass('vkEdit_column_active');

					// 表示するボタンの切り替え

						// 非表示になっているホバーボタンセットを表示
						select_targetCol.find('.vkEdit_btnSet_hover.hidden').removeClass('hidden');
						// 表示しているアクティブボタンセットを非表示に
						select_targetCol.find('.vkEdit_btnSet_active').addClass('hidden');

					// innerの中のHTMLをテキストエリアの中身に入れかえ
					var select_editingTextArea = jQuery(this).parent().parent().parent().find('textarea');
					var html_after = select_editingTextArea.val();
					// textareaを削除
					select_editingTextArea.before(html_after).remove();

					// 保存ボタンを表示
					vkEdit_display_masterPanel();
				});

				/*-------------------------------------------*/
				// キャンセルボタンをクリック
				/*-------------------------------------------*/
				jQuery(this).parent().parent().find('.vkEdit_btn_cancel').click(function(){

					// 対象のカラム
					var select_targetCol = jQuery(this).parent().parent().parent();
					// カラムからアクティブクラスを削除
					select_targetCol.removeClass('vkEdit_column_active');

					// 表示するボタンの切り替え

						// 非表示になっているホバーボタンセットを表示
						select_targetCol.find('.vkEdit_btnSet_hover.hidden').removeClass('hidden');
						// 表示しているアクティブボタンセットを非表示に
						select_targetCol.find('.vkEdit_btnSet_active').addClass('hidden');

					// innerの中のHTMLをテキストエリアの中身に入れかえ
					var select_editingTextArea = jQuery(this).parent().parent().parent().find('textarea');
					// textareaを削除
					select_editingTextArea.before(html_before).remove();
				});

			}); // Edit ボタンが押された時の動作

		} // if (jQuery(this).hasClass('vkEdit_edit_hover')) {

		});	// カラムにマウスオーバーしたら

		/*-------------------------------------------*/
		// カラムからマウスアウトしたら
		/*-------------------------------------------*/
		jQuery(this).mouseleave(function(){

			// 編集中ではない場合
			if(!jQuery(this).hasClass('vkEdit_column_active')){
				var html_column = jQuery(this).children('.vkEdit_column_inner').html();
				jQuery(this).html(html_column);
				// カラムからホバークラスを削除
				jQuery(this).removeClass(editting_class);
			} // if(!jQuery(this).hasClass('vkEdit_column_active')){
		}); //jQuery(this).mouseleave(function(){

	} // クラス名に col- が含まれている場合

});
} // function vkEdit_col_action()


/*-------------------------------------------*/
// カラムサイズ変更ボタンが押された時の処理
/*-------------------------------------------*/
function vkEdit_btn_changeCol(){
	jQuery('.vkEdit_btnSet_size .vkEdit_btn_colSize').click(function(){
		// 親セレクタを定義
		var select_current_column = jQuery(this).parent().parent().parent().parent();
		// 1.カラムのクラスを全て取得
		var colClass_all = select_current_column.attr('class');
		// 2.カラムのクラスを配列に分割
		var colClass_array = colClass_all.split(" ");
		// 3.カラムのクラスを順番に回す
		for (i = 0; i < colClass_array.length; i++) {
			// クラス名に col-sm- が含まれている場合
			if ( colClass_array[i].match(/col-sm-/) ) {
				// クラスを削除
				select_current_column.removeClass(colClass_array[i]);
			}
		}
		if ( jQuery(this).hasClass('vkEdit_btn_sm12') ) {
			select_current_column.addClass('col-sm-12');
		} else if ( jQuery(this).hasClass('vkEdit_btn_sm9') ) {
			select_current_column.addClass('col-sm-9');
		} else if ( jQuery(this).hasClass('vkEdit_btn_sm8') ) {
			select_current_column.addClass('col-sm-8');
		} else if ( jQuery(this).hasClass('vkEdit_btn_sm6') ) {
			select_current_column.addClass('col-sm-6');
		} else if ( jQuery(this).hasClass('vkEdit_btn_sm4') ) {
			select_current_column.addClass('col-sm-4');
		} else if ( jQuery(this).hasClass('vkEdit_btn_sm3') ) {
			select_current_column.addClass('col-sm-3');
		}
		// 保存ボタンを表示
		vkEdit_display_masterPanel();
	});
}


/*-------------------------------------------*/
// カラム追加ボタンが押された時の処理
/*-------------------------------------------*/
function vkEdit_btn_addCol(){
	jQuery('.vkEdit_btn_addCol').click(function(){
		var select_edittingColumns = jQuery(this).parent().parent().parent();

		/*-------------------------------------------*/
		// 今ある全部のカラムサイズを取得する
		/*-------------------------------------------*/
		var allColSize = new Number(0);
		// rowの中のカラムをループ
		jQuery(this).parent().parent().parent().parent().children('div').each(function(i){

			// 1.カラムのクラスを全て取得
			var colClass_all = jQuery(this).attr('class');
			// 2.カラムのクラスを配列に分割
			var colClass_array = colClass_all.split(" ");
			// 3.カラムのクラスを順番に回す
			for (i = 0; i < colClass_array.length; i++) {
				// クラス名に col- が含まれている場合
				if ( colClass_array[i].match(/col-/) ) {
					// 数字の部分だけを取り出し（１文字ずつ判別するので２桁でも配列になる）
					var colSize_array = colClass_array[i].match(/[1-9]/g);
					// カラムのサイズ（配列になってしまったカラムの数字を2桁にするためにくっつける）
					var colSize = new String();
					for (i2 = 0; i2 < colSize_array.length; i2++) {
						colSize += colSize_array[i2];
					}
					// col-クラスの時だけ値を加算する
					allColSize = parseInt(allColSize,10) + parseInt(colSize,10);
				}
			}

			
		}); // 今ある全部のカラムサイズを取得

		/*-------------------------------------------*/
		// カラム追加ボタンを押したカラムのサイズを取得する
		/*-------------------------------------------*/
		// 1.カラムのクラスを全て取得
		var colClass_all = select_edittingColumns.attr('class');
		// 2.カラムのクラスを配列に分割
		var colClass_array = colClass_all.split(" ");
		// 3.カラムのクラスを順番に回す
		for (i = 0; i < colClass_array.length; i++) {
			// クラス名に col- が含まれている場合
			if ( colClass_array[i].match(/col-/) ) {
				// 編集中のカラムサイズクラス（）
				var colClass_editting_sizeClass = colClass_array[i];
				// 編集パネルが出ているカラムのサイズクラスを取り出して、その数字の部分を取り出し（１文字ずつ判別するので２桁でも配列になる）
				var colSize_array = colClass_array[i].match(/[1-9]/g);
				// カラムのサイズ（配列になってしまったカラムの数字を2桁にするためにくっつける）
				var colSize = new String();　
				for (i2 = 0; i2 < colSize_array.length; i2++) {
					colSize += colSize_array[i2];
				}
				// カラムサイズ
				var colSize_number = parseInt(colSize);
			}
		}

		/*-------------------------------------------*/
		// 追加するカラムのサイズ計算
		/*-------------------------------------------*/
		// 12 > 今ある全部のカラムサイズ
		if ( 12 > allColSize ) {
			// 操作したカラムサイズ = そのまま
			var editColSize = colSize_number;
			// 追加するカラムサイズ = 12 - 今ある全部のカラムサイズ
			var addColSize = 12 - allColSize;
			var addCol = true;
		// 12 == 今ある全部のカラムサイズ
		} else if ( 12 == allColSize ) {
			// 操作したカラムサイズ = 操作したカラムサイズ/2
			// 切り上げして整数にする
			var editColSize = Math.ceil(colSize_number / 2);
			// 追加するカラムサイズ = 操作したカラムサイズ/2
			// 切り捨てして整数にする
			var addColSize = Math.floor(colSize_number / 2);

			// カラムを追加しても十分な大きさが確保出来る場合
			if ( ( editColSize > 1 ) && ( addColSize > 1 ) ) {
				var addCol = true;
			} else {
				alert("Can't add colum any more.");
				var addCol = false;
			}
		}
		if (addCol) {
			/*-------------------------------------------*/
			// カラムを追加
			/*-------------------------------------------*/
			// 操作したカラムのサイズクラスを削除・新しいサイズクラスを追加する
			select_edittingColumns.removeClass(colClass_editting_sizeClass).addClass('col-sm-'+editColSize);
			// カラムを追加する
			var add_col_html = '<div class="col-sm-'+ addColSize +'">Input here.</div>';
			select_edittingColumns.after(add_col_html);
			vkEdit_col_action();
		}
	});
}
function vkEdit_btn_delCol(){
	jQuery('.vkEdit_btn_delCol').click(function(){
		if (confirm("Are you sure?")) {
			jQuery(this).parent().parent().parent().remove();
			vkEdit_display_masterPanel();
		}
	});
}

/*-------------------------------------------*/
// 保存ボタン表示処理
/*-------------------------------------------*/
function vkEdit_display_masterPanel(){
	var html_masterPanel = '<div id="vkEdit_masterCtrlPanel" class="vkEdit_masterCtrlPanel vkEdit_masterCtrlPanel_alert row"><div class="col-md-2"><button id="submit" class="button button-primary button-large"><i class="fa fa-floppy-o"></i> Save</button></div><div class="col-md-10"><p>Change has not yet been saved.</p></div></div>';
	if( ! jQuery('#vkEdit_editWrap').prev().hasClass('vkEdit_masterCtrlPanel')){
		jQuery('#vkEdit_editWrap').before(html_masterPanel);
		/*-------------------------------------------*/
		// 保存処理（php側に記載）
		/*-------------------------------------------*/
		vkEdit_saveStart();
	}
}

/*-------------------------------------------*/
// Row Wrap ボタン表示処理
/*-------------------------------------------*/
var btn_rowWrap = '<span class="vkEdit_btn vkEdit_btn_rowWrap"><i class="fa fa-sign-in"></i> Row Wrap</span>';
function vkEdit_rowWrapBtn_display(){
	jQuery('#vkEdit_editWrap div,#vkEdit_editWrap h1,#vkEdit_editWrap h2,#vkEdit_editWrap h3,#vkEdit_editWrap h4,#vkEdit_editWrap h5,#vkEdit_editWrap h6,#vkEdit_editWrap p,#vkEdit_editWrap ul,#vkEdit_editWrap ol,#vkEdit_editWrap dl,#vkEdit_editWrap block,#vkEdit_editWrap blockquote').each(function(i){
			// マウスオーバーしたら
			jQuery(this).mouseenter(function(){
				// ホバー要素のクラスを全て取得
				var colClass_all = jQuery(this).attr('class');

				// 既にrowWrapボタンが存在しない場合 && 既に rowでない場合 && カラムでない場合 && rowWrapボタンを表示する対象でない場合
				if ( !jQuery(this).children().hasClass('vkEdit_btn_rowWrap') && !jQuery(this).hasClass('row') && !jQuery(this).hasClass('vkEdit_no_add_row') ){
					// ホバー要素のクラスが空の場合か col ではない場合
					if ( !colClass_all || !(colClass_all && colClass_all.match(/col-/)) ) {
						// rowWrapボタンを表示
						jQuery(this).prepend(btn_rowWrap);
						// rowWrapボタンが押されたら
						vkEdit_rowWrap_click();
						// マウスアウトしたら
						jQuery(this).mouseleave(function(){
							// rowWrapボタンを削除
							jQuery(this).children('.vkEdit_btn_rowWrap').remove();
						});
					}

				}
			});
	});
}

/*-------------------------------------------*/
// Row Wrap ボタンが押された時の処理
/*-------------------------------------------*/
function vkEdit_rowWrap_click(){
	jQuery('.vkEdit_btn_rowWrap').click(function(){
		jQuery(this).parent().wrap('<div class="row"><div class="col-sm-12"></div></div>');
		// クリックされたのでrowWrapボタンを削除（重複wrapを防ぐため）
		jQuery(this).remove();
		// 新しく追加したグリッドでもエディタが走るように再実行
		vkEdit_row_action();
		vkEdit_col_action();
		// 保存ボタンを表示
		vkEdit_display_masterPanel();
	});
}
/*-------------------------------------------*/
// Row Wrap ボタンが押された時の処理
/*-------------------------------------------*/
jQuery('#vkEdit_editWrap').mouseenter(function(){
	if ( !jQuery(this).children('div').hasClass('vkEdit_editPanel_firstAddrow') ){
		var html_first_addRow_panel = '<div id="vkEdit_editPanel_firstAddrow" class="vkEdit_editPanel_firstAddrow">' + btn_row_add_down + '</div>';
		jQuery(this).prepend(html_first_addRow_panel);
		jQuery(this).find('.vkEdit_btn_addRow_down').click(function(){
			jQuery(this).parent().after(html_rowDefaultSet);
			vkEdit_row_action();
			vkEdit_col_action();
			vkEdit_display_masterPanel();
		});
	}
	// マウスアウトしたら
	jQuery(this).mouseleave(function(){
		// vkEdit_editPanel_firstAddrowパネルを削除
		jQuery(this).children('#vkEdit_editPanel_firstAddrow').remove();
	});
});