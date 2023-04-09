/**
 * jQuery Select2 Multi checkboxes
 * - allow to select multi values via normal dropdown control
 *
 * author      : wasikuss
 * repo        : https://github.com/wasikuss/select2-multi-checkboxes
 * inspired by : https://github.com/select2/select2/issues/411
 * License     : MIT
 */
(function($) {
  var S2MultiCheckboxes = function(options, element) {
    var self = this;
    self.options = options;
    self.$element = $(element);
	var values = self.$element.val();
    self.$element.removeAttr('multiple');
    self.select2 = self.$element.select2({
      allowClear: true,
      minimumResultsForSearch: options.minimumResultsForSearch,
      placeholder: options.placeholder,
      closeOnSelect: false,
      templateSelection: function() {
        return self.options.templateSelection(self.$element.val() || [], $('option', self.$element).length);
      },
      templateResult: function(result) {
        if (result.loading !== undefined)
          return result.text;
        return $('<div>').text(result.text).addClass(self.options.wrapClass);
      },
      matcher: function(params, data) {
        var original_matcher = $.fn.select2.defaults.defaults.matcher;
        var result = original_matcher(params, data);
        if (result && self.options.searchMatchOptGroups && data.children && result.children && data.children.length != result.children.length) {
          result.children = data.children;
        }
        return result;
      },
      dropdownAdapter: options.selectAll ? $.fn.select2.amd.require('select2/selectAllAdapter') : null,
    }).data('select2');
    
    self.select2.$results.off("mouseup").on("mouseup", ".select2-results__option[aria-selected]", (function(self) {
      return function(evt) {
        var $this = $(this);
	
        const Utils = $.fn.select2.amd.require('select2/utils')
            var data = Utils.GetData(this, 'data');

            if ($this.attr('aria-selected') === 'true') {
              self.trigger('unselect', {
                originalEvent: evt,
                data: data
              });

              return;
            }

            self.trigger('select', {
              originalEvent: evt,
              data: data
            });
      }
    })(self.select2));
    
    self.$element.attr('multiple', 'multiple').val(values).trigger('change.select2');
  }

  $.fn.extend({
    select2MultiCheckboxes: function() {
      var options = $.extend({
        placeholder: 'Choose elements',
        templateSelection: function(selected, total) {
          return selected.length + ' > ' + total + ' total';
        },
        wrapClass: 'wrap',
        minimumResultsForSearch: -1,
        searchMatchOptGroups: true,
        selectAll: true,
      }, arguments[0]);

      this.each(function() {
        new S2MultiCheckboxes(options, this);
      });
    }
  });

  $.fn.select2.amd.define('select2/selectAllAdapter', [
    'select2/utils',
    'select2/dropdown',
    'select2/dropdown/attachBody',
    'select2/dropdown/attachContainer',
    'select2/dropdown/search',
  ], function(Utils, Dropdown, AttachBody, AttachContainer, Search) {
    function SelectAll() {}

    SelectAll.prototype.render = function(decorated) {

      var $rendered = decorated.call(this);

      var self = this;

      var $selectAll = $(
          '<input type="checkbox" class="btn btn-light" data-toggle="tooltip" title="Chọn tất cả" style="margin-right: .65rem;margin-left: .1rem"/>'
      );

      var checkOptionsCount = function() {
        var count = $('.select2-results__option').length;
        $selectAll.text('Chọn tất cả (' + count + ')');
      }

      var $container = $('.select2-container');
      $container.bind('keyup click', checkOptionsCount);

      var $dropdown = $rendered.find('.select2-search--dropdown')

      $dropdown.prepend($selectAll);


      $selectAll.on('click', function(e) {
        var $results = $rendered.find('.select2-results__option');
        const Utils = $.fn.select2.amd.require('select2/utils');
        
        $results.each(function() {
          // Trigger the select event
          if($selectAll.is(':checked')) {
            self.trigger('select', {
              data: Utils.GetData(this, 'data')
            });
          } else {
            self.trigger('unselect', {
              data: Utils.GetData(this, 'data')
            });
          }
        });

        // Close list after click
        // self.trigger('close');
      });

      //Thêm class để style lại theo ý muốn
      if($rendered.find('.select2-search__field')){
         $rendered.find('.select2-search__field').addClass('inputCheckAll');
      }

      return $rendered;
    };

    let adapter = Utils.Decorate(Utils.Decorate(Dropdown,Search), AttachBody, AttachContainer);
    adapter = Utils.Decorate(adapter, SelectAll);

    return adapter
  });

})(jQuery);
