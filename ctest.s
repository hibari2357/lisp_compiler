	.section	__TEXT,__text,regular,pure_instructions
	.macosx_version_min 10, 14
	.globl	_scheme_entry           ## -- Begin function scheme_entry
	.p2align	4, 0x90
_scheme_entry:                          ## @scheme_entry
	.cfi_startproc
## BB#0:
	movl	$99999, %eax
	retq
	.cfi_endproc
                                        ## -- End function

.subsections_via_symbols
