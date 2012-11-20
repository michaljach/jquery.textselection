jquery.textselection
====================

Lightweight jQuery plugin for DOM text selection.

# Install
Just copy jquery.textselection.js to Your server and include it and jQuery.

# Usage
- Select all text

    	$('#element').textselection();

- Select range (start, end)

		$('#element').textselection('range',2,4);

- Select first X characters

		$('#element').textselection('range',2);

- Find first occurrence of substring

        $('#element').textselection('find','substring');

- Find specific occurrence of substring

        $('#element').textselection('find','substring',2);

- Clear all selection

		$('#element').textselection('clear');

#License

[Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)](http://creativecommons.org/licenses/by-sa/3.0/)