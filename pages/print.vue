<template>
  <div id="container">
    <html>
      <head>
        <base href="https://www.codebee.co.th/invoicemaker/">
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-5HW7CS" /><script async="" src="//www.google-analytics.com/analytics.js" /><script type="text/javascript" src="js/jquery-1.3.2.min.js" />
        <script type="text/javascript" src="js/invoicemaker.js" />
      </head>

      <body>
        <div id="page-wrap">
          <textarea id="header_print">ใบเสร็จ</textarea>
          <div style="clear:both" />
          <div id="customer">
            <textarea id="customer-title">บริษัท เชียงใหม่</textarea>
            <table id="meta">
              <tbody>
                <tr>
                  <td class="meta-head">
                    วันที่เอกสาร
                  </td>
                  <td><textarea id="date" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <table id="items">
            <tbody>
              <tr>
                <th>ชื่อ</th>
                <th>ประเภทที่ทำ</th>
                <th>จำนวน</th>
                <th>ราคา</th>
                <th>รวม / บาท</th>
              </tr>

              <tr class="item-row">
                <td class="item-name">
                  <div class="delete-wpr">
                    <textarea /><a class="delete" href="javascript:;" title="ลบรายการนี้"><i class="glyphicon glyphicon-minus-sign" /></a>
                  </div>
                </td>
                <td class="description">
                  <textarea> -</textarea>
                </td>
                <td><textarea class="qty">1</textarea></td>
                <td><textarea class="cost">0</textarea></td>
                <td><span class="price">0.00</span></td>
              </tr>
              <tr id="hiderow">
                <td colspan="5">
                  <div class="add-wpr">
                    <a id="addrow" href="javascript:;" title="เพิ่มรายการ"><i class="glyphicon glyphicon-plus-sign" /></a>
                  </div>
                </td>
              </tr>

              <tr>
                <td colspan="2" class="blank" />
                <td colspan="2" class="total-line">
                  รวมเงิน
                </td>
                <td class="total-value">
                  <div id="subtotal">
                    0.00 บาท
                  </div>
                </td>
              </tr>

              <tr>
                <td colspan="2" class="blank" />
                <td colspan="2" class="total-line">
                  ภาษีมูลค่าเพิ่ม
                </td>

                <td class="total-value">
                  <textarea id="paid">0.00 บาท</textarea>
                </td>
              </tr>
              <tr>
                <td colspan="2" class="blank" />
                <td colspan="2" class="total-line balance">
                  รวมสุทธิ
                </td>
                <td class="total-value balance">
                  <div class="due">
                    0.00 บาท
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </div>
</template>

<script>
export default {
  layout: 'print'
}
</script>
